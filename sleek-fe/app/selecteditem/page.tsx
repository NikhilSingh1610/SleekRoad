"use client";

import { Button } from '../../components/ui/button';
import { Star, Package, Home, ArrowLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useSearchParams
import Loader from '../../components/Loader';
import { useAuth } from '../../firebase/AuthProvider'; // Import useAuth
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export default function SelectedItemPage() {
	const searchParams = useSearchParams();
	const itemId = searchParams.get('id'); // Get the item ID from query parameters

	const router = useRouter();
	const { user } = useAuth(); // Get user from useAuth

	const [item, setItem] = useState(null);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [images, setImages] = useState([]); // Initialize images state

	const [products, setProducts] = useState(relatedProducts);
	const [page, setPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sellerDetails, setSellerDetails] = useState(null); // State to store seller details
	const [isFavorited, setIsFavorited] = useState(false); // State to track if the item is favorited
	const [isLoading, setIsLoading] = useState(true); // Add loading state

	const getRandomProductFromRelated = () => {
		const randomIndex = Math.floor(Math.random() * relatedProducts.length);
		const randomProduct = relatedProducts[randomIndex];
		return {
			...randomProduct,
			id: (Math.random() * 100000).toFixed(0) // Ensure unique ID for each new product
		};
	};

	const loadMoreProducts = () => {
		const newProducts = Array.from({ length: 4 }, () => getRandomProductFromRelated());
		setProducts((prev) => [...prev, ...newProducts]);
		setPage((prev) => prev + 1);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 100
			) {
				loadMoreProducts();
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const touchStartX = useRef(0);

	const handleTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e) => {
		const touchEndX = e.changedTouches[0].clientX;
		if (touchStartX.current - touchEndX > 50) {
			handleSwipe('left');
		} else if (touchEndX - touchStartX.current > 50) {
			handleSwipe('right');
		}
	};

	const handleSwipe = (direction) => {
		if (direction === 'left') {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
		} else if (direction === 'right') {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === 0 ? images.length - 1 : prevIndex - 1
			);
		}
	};

	const handleGetContactDetails = async () => {
		if (!user) {
			router.push('/signin'); // Redirect to signup page if user is not signed in
			return;
		}

		// Try backend fetch if URL is configured; otherwise fall back to item.user (if available)
		const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
		let fetchedSeller = null;
		if (backendUrl) {
			try {
				const response = await fetch(`${backendUrl}/api/seller/${item.userId}`);
				if (response.ok) {
					const data = await response.json();
					fetchedSeller = data.seller;
				} else {
					console.warn('Failed to fetch seller details from backend, status:', response.status);
				}
			} catch (error) {
				console.warn('Error fetching seller details from backend:', error);
			}
		}

		// Fallback to embedded item.user if backend is not available or returned nothing
		if (!fetchedSeller && item?.user) {
			fetchedSeller = {
				name: item.user.name || item.user.username || 'Seller',
				email: item.user.email || '',
				phone: item.user.phone || '',
				avatar: item.user.avatar || '',
				address: item.user.address || ''
			};
		}

		if (fetchedSeller) {
			setSellerDetails(fetchedSeller);
			setIsModalOpen(true);
		} else {
			alert('Seller contact details are not available at the moment.');
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// Ensure a conversation exists between the current user and the other email.
	async function ensureConversation(meEmail, otherEmail) {
		if (!meEmail || !otherEmail) return null;
		// find any conversation that contains both participants
		const q = query(collection(db, 'conversations'), where('participantsEmails', 'array-contains', otherEmail));
		const snap = await getDocs(q);
		for (const d of snap.docs) {
			const data = d.data();
			const parts = data.participantsEmails || [];
			if (parts.includes(meEmail) && parts.includes(otherEmail)) return d.id;
		}
		// not found -> create
		const ref = await addDoc(collection(db, 'conversations'), {
			participantsEmails: [meEmail, otherEmail],
			createdAt: serverTimestamp(),
			lastMessage: '',
			lastUpdated: serverTimestamp(),
		});
		return ref.id;
	}

	async function handleMessageSeller() {
		if (!user) {
			router.push('/signin');
			return;
		}
		if (!sellerDetails?.email) {
			alert('Seller has no contact email available.');
			return;
		}
		const convId = await ensureConversation(user.email || '', sellerDetails.email);
		setIsModalOpen(false);
		// navigate to messages page — pass convId as query param
		router.push(`/messages?convId=${convId}`);
	}

	useEffect(() => {
		const fetchItemDetails = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item/${itemId}`);
				if (response.ok) {
					const data = await response.json();
					setItem(data.item);
					setRelatedProducts(data.relatedProducts || []); // Assuming related products are included
				} else {
					console.error('Failed to fetch item details');
				}
			} catch (error) {
				console.error('Error fetching item details:', error);
			} finally {
				setIsLoading(false); // Stop loader after fetching data
			}
		};

		if (itemId) {
			fetchItemDetails();
		}
	}, [itemId]);

	useEffect(() => {
		if (item?.images) {
			setImages(item.images); // Populate images after fetching item details
		}
	}, [item]);

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		setIsFavorited(favorites.includes(itemId));
	}, [itemId]);

	const handleFavoriteClick = () => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		if (favorites.includes(itemId)) {
			const updatedFavorites = favorites.filter((id) => id !== itemId);
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
			setIsFavorited(false);
		} else {
			favorites.push(itemId);
			localStorage.setItem('favorites', JSON.stringify(favorites));
			setIsFavorited(true);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader />
			</div>
		);
	}

	if (!item) {
		return <p>Loading...</p>; // Show a loading state while fetching data
	}

	const handleViewDetails = (productId) => {
		router.push(`/selecteditem?id=${productId}`);
	};

	return (
		<section className="min-h-screen py-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/10 dark:to-red-950/10">
			<div className="container mx-auto px-4">
				{/* Header with Back and Home Buttons */}
				<div className="flex items-center justify-between p-4 border-gray-300">
					<button
						onClick={() => window.history.back()}
						className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-black hover:bg-gray-100"
					>
						<ArrowLeft className="w-5 h-5 text-black" />
						<span className="text-sm font-medium">Back</span>
					</button>
					<a
						href="/"
						className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-black hover:bg-gray-100"
					>
						<Home className="w-5 h-5 text-black" />
						<span className="text-sm font-medium">Home</span>
					</a>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Image Section */}
					<div className="flex-verticle justify-center items-center relative">
						<div
							className="relative w-full max-w-lg h-96 overflow-hidden rounded-lg"
							onTouchStart={handleTouchStart} // Attach touch start event
							onTouchEnd={handleTouchEnd} // Attach touch end event
						>
							{images.map((image, index) => (
								<img
									key={index}
									src={image}
									alt={`${item.name} - ${index + 1}`}
									className={`absolute inset-0 rounded-lg shadow-md w-full h-96 object-contain transition-opacity duration-300 ${
										index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
									}`}
								/>
							))}
						</div>

						{/* Move the indicator below the image box */}
						<div className="flex justify-center mt-4 gap-2"> {/* Added margin-top to separate from the image box */}
							{images.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentImageIndex(index)}
									className={`w-3 h-3 rounded-full ${
										index === currentImageIndex ? 'bg-blue-400' : 'bg-gray-400'
									}`}
								/>
							))}
						</div>
					</div>

					{/* Details Section */}
					<div>
						<div className="flex items-center gap-2 mb-4">
							<h1 className="text-4xl font-bold mb-4 line-clamp-2">{item.name}</h1>
						</div>
						<p className="text-lg font-semibold text-green-600 mb-2">
							₹{item.discountedPrice}
							<span className="line-through text-gray-500 ml-2">
								₹{item.actualPrice}
							</span>
						</p>
						<p className="text-muted-foreground mb-6">{item.description}</p>

						<div className="flex items-center gap-2 mb-4">
							<Star className="w-5 h-5 text-yellow-500" />
							<span className="text-sm font-medium">
								{item.rating || '4.5'} (Verified Seller)
							</span>
						</div>

						<div className="flex gap-4">
							<Button 
							  className="bg-gradient-to-r from-green-300 to-green-600 hover:from-green-400 hover:to-green-700"
							  onClick={handleGetContactDetails}
							>
								Get Contact Details
							</Button>
							<Button 
							  className={`border ${isFavorited ? 'bg-red-500 text-white' : 'bg-white text-red-500'} hover:bg-red-100`} 
							  onClick={handleFavoriteClick}
							>
								{isFavorited ? 'Favorited' : 'Add to Favorites'}
							</Button>
						</div>
					</div>
				</div>

				{/* Related Products Section */}
				<div className="mt-12">
					<div className="flex items-center gap-3 mb-4">
						<Package className="w-6 h-6 text-gray-700" />
						<h2 className="text-3xl font-extrabold">More in {item.category}</h2>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
						{relatedProducts.map((product) => (
							<div key={product.id} className="mb-4">
								<ProductCard 
									product={{
									id: product.id,
									title: product.name,
									price: product.discountedPrice,
									originalPrice: product.actualPrice,
									image: product.images?.[0] || '/placeholder-image.png', // Fallback image
									condition: 'Good', // Static condition for now
									seller: {
										name: product.user?.name || 'Unknown Seller',
										rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
										verified: false // Static verified status for now
									},
									location: product.category,
									postedTime: 'Just now', // Static posted time for now
									category: product.category,
									isFavorited: false // Static favorite status for now
								}}
								onViewDetails={() => handleViewDetails(product.id)}
								 />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Modal for Contact Details (upgraded UI + messaging integration) */}
			{isModalOpen && sellerDetails && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
					<div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
						<div className="flex flex-col md:flex-row">
							{/* Left: Seller summary */}
							<div className="md:w-1/3 p-6 bg-gradient-to-b from-green-50 to-white flex flex-col items-center gap-4">
								<div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-white flex items-center justify-center">
									{sellerDetails.avatar ? (
										<img src={sellerDetails.avatar} alt={sellerDetails.name} className="w-full h-full object-cover" />
									) : (
										<span className="text-2xl font-bold text-gray-700">{sellerDetails.name?.charAt(0) || 'S'}</span>
									)}
								</div>
								<h3 className="text-lg font-semibold text-gray-900 text-center">{sellerDetails.name}</h3>
								<p className="text-sm text-muted-foreground text-center">Verified Seller</p>
							</div>
						
							{/* Right: Contact details and actions */}
							<div className="md:w-2/3 p-6">
								<div className="flex items-start justify-between">
									<div>
										<h4 className="text-xl font-bold">Contact & chat</h4>
										<p className="text-sm text-muted-foreground mt-1">Connect with the seller securely through the in-app chat or via email/phone.</p>
									</div>
									<div>
										<button onClick={() => setIsModalOpen(false)} className="text-sm text-gray-500 hover:text-gray-700">Close</button>
									</div>
								</div>
							
								<div className="mt-6 grid gap-3">
									<div className="flex items-center gap-3">
										<svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5C3 6.29 4.79 4.5 7 4.5h10c2.21 0 4 1.79 4 4v7c0 2.21-1.79 4-4 4H7c-2.21 0-4-1.79-4-4v-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
										<div>
											<p className="text-sm text-gray-700"><strong>Email</strong></p>
											<p className="text-sm text-muted-foreground">{sellerDetails.email || 'Not provided'}</p>
										</div>
									</div>
									{sellerDetails.phone && (
										<div className="flex items-center gap-3">
											<svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.36 2.07.72 3.03a2 2 0 0 1-.45 2.11L9.91 9.91a16 16 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.11-.45c.96.36 1.98.6 3.03.72A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
											<div>
												<p className="text-sm text-gray-700"><strong>Phone</strong></p>
												<p className="text-sm text-muted-foreground">{sellerDetails.phone}</p>
											</div>
										</div>
									)}
									{sellerDetails.address && (
										<div className="mt-2 text-sm text-muted-foreground">{sellerDetails.address}</div>
									)}
								</div>
							
								<div className="mt-6 flex flex-col sm:flex-row gap-3">
									<button
										className="flex-1 px-4 py-2 rounded-lg bg-black text-white hover:opacity-95"
										onClick={async () => {
											await handleMessageSeller();
										}}
									>
										Message seller
									</button>
									<button
										className="flex-1 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
										onClick={() => {
										navigator.clipboard?.writeText(sellerDetails.email || '')
											.then(() => alert('Email copied to clipboard'))
											.catch(() => alert('Unable to copy'));
										}}
									>
										Copy email
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}