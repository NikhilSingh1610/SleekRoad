"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ArrowLeft, Edit3, Star, Mail, Phone, MapPin, LogOut, Edit, LayoutDashboard, FileText, Trash2, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { useAuth } from '../../firebase/AuthProvider';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (user?.email) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/details?email=${encodeURIComponent(user.email)}`);
          if (response.ok) {
            const data = await response.json();
            setUserDetails(data);
          } else {
            console.error('Failed to fetch user details');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }
  }, [user]);

  const handleEditClick = () => {
    setEditDetails(userDetails);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleClosePopup = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editDetails),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserDetails(updatedUser.user);
        setIsEditing(false);
      } else {
        console.error('Failed to update user details');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user?.email }),
        });

        if (response.ok) {
          alert('Your account has been deleted successfully.');
          logout();
          router.push('/');
        } else {
          console.error('Failed to delete account');
          alert('Failed to delete your account. Please try again later.');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting your account. Please try again later.');
      }
    }
  };

  return (
    <section className="min-h-screen py-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/10 dark:to-red-950/10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4 max-w-4xl mx-auto">
          <Button
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 border border-black rounded-md"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Profile</h1>
          <Button
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 border border-black rounded-md"
            onClick={handleEditClick}
          >
            <Edit3 className="w-5 h-5" />
            Edit
          </Button>
        </div>

        {/* Profile Card */}
        <div className="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-900 shadow-lg rounded-lg p-8 flex items-center gap-8 relative">
          {/* Profile Logo */}
          <div className="relative w-32 h-32 border-4 border-black rounded-full overflow-visible">
            <Avatar className="w-full h-full">
              {user?.photoURL ? (
                <AvatarImage src={user.photoURL} alt="Profile" />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {userDetails.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>

            {/* Star Icon Positioned Closer to Circle */}
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-yellow-400 rounded-full p-2 z-10">
              <Star className="w-6 h-6 text-black" />
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <p className="text-2xl font-extrabold text-white bg-gradient-to-r from-green-300 to-green-600 rounded-md px-4 py-2">
              {userDetails.name}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Email:</span>
              <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-lg text-gray-700 dark:text-gray-300">{userDetails.email}</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Phone:</span>
              <Phone className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-lg text-gray-700 dark:text-gray-300">{userDetails.phone}</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Address:</span>
              <MapPin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-lg text-gray-700 dark:text-gray-300">{userDetails.address}</span>
            </div>
          </div>
        </div>

        {/* Edit Popup */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    name="name"
                    value={editDetails.name || ''}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    name="email"
                    value={editDetails.email || ''}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input
                    name="phone"
                    value={editDetails.phone || ''}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Input
                    name="address"
                    value={editDetails.address || ''}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" onClick={handleClosePopup} className="bg-gray-500 text-white">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-500 text-white">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Options Section */}
        <div className="mt-8 space-y-4 max-w-4xl mx-auto">
          {/* Option: Edit Profile */}
          <div
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={handleEditClick}
          >
            <div className="flex items-center gap-4">
              <Edit className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <span className="text-lg text-gray-700 dark:text-gray-300">Edit Profile</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>

          {/* Option: Dashboard */}
          <div
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => router.push('/dashboard')}
          >
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <span className="text-lg text-gray-700 dark:text-gray-300">Dashboard</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>

          {/* Option: Terms and Conditions */}
          <div
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => router.push('/terms')}
          >
            <div className="flex items-center gap-4">
              <FileText className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <span className="text-lg text-gray-700 dark:text-gray-300">Terms and Conditions</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>

          {/* Option: Delete Account */}
          <div
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={handleDeleteAccount}
          >
            <div className="flex items-center gap-4">
              <Trash2 className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <span className="text-lg text-gray-700 dark:text-gray-300">Delete Account</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>

          {/* Option: Logout */}
          <div
            className="flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-md shadow-md cursor-pointer hover:from-red-600 hover:to-orange-600"
            onClick={logout}
          >
            <LogOut className="w-6 h-6 text-white mr-2" />
            <span className="text-lg text-white">Logout</span>
          </div>
        </div>
      </div>
    </section>
  );
}