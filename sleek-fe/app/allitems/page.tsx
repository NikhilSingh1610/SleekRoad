"use client"

import * as React from 'react';
import { ProductCard } from '../../components/ProductCard';
import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { Home } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useRouter and useSearchParams
import Loader from '../../components/Loader';
import { Suspense } from 'react';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function AllItemsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllItemsPage />
    </Suspense>
  );
}

function AllItemsPage() {
	const [products, setProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [isLoading, setIsLoading] = useState(true); // Add loading state
	const router = useRouter();
	const searchParams = useSearchParams(); // Initialize useSearchParams

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000); // Show loader for 1 second

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const categoryFromQuery = searchParams.get('category'); // Get category from query params
		if (categoryFromQuery) {
			setSelectedCategory(categoryFromQuery);
		}
	}, [searchParams]); // Re-run when searchParams changes

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item/all`
				);
				if (response.ok) {
					const data = await response.json();
					const itemsWithRatings = data.items.map((item) => ({
						...item,
						rating: (Math.random() * (5 - 4) + 4).toFixed(1), // Generate random rating between 4 and 5
					}));
					setProducts(shuffleArray(itemsWithRatings)); // Shuffle items before setting state
				} else {
					console.error('Failed to fetch items');
				}
			} catch (error) {
				console.error('Error fetching items:', error);
			} finally {
				setIsLoading(false); // Stop loader after items are fetched
			}
		};

		fetchItems();
	}, []);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader />
			</div>
		);
	}

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

	const filteredProducts =
		selectedCategory === "All Categories"
			? products
			: products.filter((product) => product.category === selectedCategory);

	// Define handleViewDetails function
	const handleViewDetails = (productId) => {
		router.push(`/selecteditem?id=${productId}`);
	};

	return (
		<section className="py-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/10 dark:to-red-950/10">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
							<Package className="w-6 h-6 text-white" />
						</div>
						<div>
							<h2 className="text-3xl font-bold">All items</h2>
							<p className="text-muted-foreground">
								Buy, Sell & Swap everything on campus.
							</p>
						</div>
					</div>
					<a
						href="/"
						className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-black hover:bg-gray-100"
					>
						<Home className="w-5 h-5 text-black" />
						<span className="text-sm font-medium">Home</span>
					</a>
				</div>

				{/* Categories Line */}
				<div className="flex py-2 gap-3 overflow-x-auto pb-4 justify-center">
					{["All Categories", "Clothes", "Shoes", "Books", "Tech Products", "Electronics", "Instruments","Tutoring & Services", "Others"].map((category, index) => (
						<button
							key={index}
							onClick={() => handleCategoryClick(category)}
							className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap ${
								selectedCategory === category
									? "bg-gradient-to-r from-[var(--brand-1)] to-[rgba(166,124,82,0.2)] text-[var(--brand-3)]"
									: "bg-gray-100 text-black"
							} hover:bg-gradient-to-r hover:from-[var(--brand-1)] hover:to-[rgba(166,124,82,0.2)] hover:text-[var(--brand-3)] transition`}
						>
							{category}
						</button>
					))}
				</div>

				{/* Products Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
					{filteredProducts.map((product) => (
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
										rating: product.rating,
										verified: false // Static verified status for now
									},
									location: product.category,
									postedTime: 'Just now', // Static posted time for now
									category: product.category,
									isFavorited: false // Static favorite status for now
								}}
								onViewDetails={() => handleViewDetails(product.id)} // Pass the handler as a prop
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}