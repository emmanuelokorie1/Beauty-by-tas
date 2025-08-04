"use client";

import { useState, useEffect, useMemo } from "react";
import shopImgTemp from "../../assets/shop/shoptemp.svg";
import { FiSearch, FiX, FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { LuDot } from "react-icons/lu";
import { IoGridOutline, IoListOutline } from "react-icons/io5";
import ProductCard from "../../Components/ProductCard";
import BackgroundImg from "../../Components/BackgroundImg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { CategoryType, ProductType } from "../../types/commonTypes";
import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProducts";
import { images } from "../../constants";

function Shop() {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'newest'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 10000]);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(null);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const { data: products = [], isLoading: productsLoading } = useProducts(
    selectedCategory?.categoryid
  );

  // Calculate price range from products
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p => p.price).filter(p => p !== undefined);
      if (prices.length > 0) {
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
        setSelectedPriceRange([minPrice, maxPrice]);
      }
    }
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        (product.productname?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'name':
        filtered = [...filtered].sort((a, b) => (a.productname || '').localeCompare(b.productname || ''));
        break;
      case 'price-low':
        filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        break;
    }

    return filtered;
  }, [products, searchTerm, sortBy, selectedPriceRange]);

  // Function to get dynamic background image based on category
  const getCategoryBackgroundImage = (categoryName: string) => {
    const categoryNameLower = categoryName?.toLowerCase();
    
    if (categoryNameLower?.includes("gift")) return images.giftImg;
    if (categoryNameLower?.includes("lip balm") || categoryNameLower?.includes("lips balm")) return images.lipsBalm;
    if (categoryNameLower?.includes("add-ons") || categoryNameLower?.includes("add ons")) return images.adsOn;
    if (categoryNameLower?.includes("body oil") || categoryNameLower?.includes("body oils")) return images.bodyOil;
    if (categoryNameLower?.includes("lip crayon") || categoryNameLower?.includes("lip crayons")) return images.lipCrayon;
    if (categoryNameLower?.includes("lip jelly") || categoryNameLower?.includes("lip jellies")) return images.lipJelly;
    if (categoryNameLower?.includes("lip gloss") || categoryNameLower?.includes("lip glosses")) return images.lipGloss;
    if (categoryNameLower?.includes("lip oil") || categoryNameLower?.includes("lip oils")) return images.lipOil;
    
    return shopImgTemp;
  };

  // Function to get overlay type based on category
  const getOverlayType = (categoryName: string): 'dark' | 'light' | 'auto' => {
    const categoryNameLower = categoryName?.toLowerCase();
    
    if (categoryNameLower?.includes("lip crayon") || categoryNameLower?.includes("lip crayons")) return 'dark';
    if (categoryNameLower?.includes("lip jelly") || categoryNameLower?.includes("lip jellies")) return 'dark';
    if (categoryNameLower?.includes("lip gloss") || categoryNameLower?.includes("lip glosses")) return 'dark';
    if (categoryNameLower?.includes("gift")) return 'dark';
    if (categoryNameLower?.includes("lip balm") || categoryNameLower?.includes("lips balm")) return 'dark';
    if (categoryNameLower?.includes("add-ons") || categoryNameLower?.includes("add ons")) return 'dark';
    if (categoryNameLower?.includes("body oil") || categoryNameLower?.includes("body oils")) return 'dark';
    if (categoryNameLower?.includes("lip oil") || categoryNameLower?.includes("lip oils")) return 'dark';
    
    return 'dark';
  };

  // Toggle wishlist
  const toggleWishlist = (productId: string) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  // Set first category as default when categories load
  useEffect(() => {
    if (categories?.length > 0 && !selectedCategory) {
      setSelectedCategory(categories?.[0]);
    }
  }, [categories, selectedCategory]);

  if (categoriesLoading) {
    return (
      <div>
        <BackgroundImg img={shopImgTemp} header="Loading..." height="medium" />
        <div className="containers py-[2rem]">
          <Skeleton height={40} className="mb-4" />
          <Skeleton height={200} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BackgroundImg
        img={getCategoryBackgroundImage(selectedCategory?.categoryname || "")}
        header={selectedCategory?.categoryname || "Shop"}
        overlayType={getOverlayType(selectedCategory?.categoryname || "")}
        height="medium"
        animation="fade"
      />

      <section className="containers py-[2rem]">
        {/* Breadcrumb */}
        <div className="flex gap-[.3rem] items-center py-[1rem] mb-6">
          <div className="font-semibold text-[.9rem] text-gray-700">Shop</div>
          <div className="text-gray-400">
            <LuDot />
          </div>
          <div className="text-[.85rem] text-gray-600 capitalize">
            {selectedCategory?.categoryname}
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX />
                </button>
              )}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                  showFilters 
                    ? 'bg-pink-600 text-white border-pink-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-pink-300'
                }`}
              >
                <FiFilter />
                <span className="hidden sm:inline">Filters</span>
                {showFilters ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price-low' | 'price-high' | 'newest')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-sm text-pink-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <IoGridOutline size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-pink-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <IoListOutline size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range: {formatPrice(selectedPriceRange[0])} - {formatPrice(selectedPriceRange[1])}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={priceRange[0]}
                      max={priceRange[1]}
                      value={selectedPriceRange[0]}
                      onChange={(e) => setSelectedPriceRange([parseInt(e.target.value), selectedPriceRange[1]])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <input
                      type="range"
                      min={priceRange[0]}
                      max={priceRange[1]}
                      value={selectedPriceRange[1]}
                      onChange={(e) => setSelectedPriceRange([selectedPriceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-800">{filteredProducts.length}</div>
                      <div className="text-sm text-gray-600">Products</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-800">{categories.length}</div>
                      <div className="text-sm text-gray-600">Categories</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {Array?.isArray(categories) && categories?.map((category: CategoryType, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  category?.categoryname === selectedCategory?.categoryname
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-200'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                {category?.categoryname}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
            {searchTerm && (
              <span className="ml-2">
                for "<span className="font-semibold text-gray-800">{searchTerm}</span>"
              </span>
            )}
            {selectedPriceRange[0] !== priceRange[0] || selectedPriceRange[1] !== priceRange[1] && (
              <span className="ml-2">
                in price range <span className="font-semibold text-gray-800">
                  {formatPrice(selectedPriceRange[0])} - {formatPrice(selectedPriceRange[1])}
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid s1100:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6' 
            : 'space-y-4'
        }`}>
          {productsLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCard key={i} loading={true} />
            ))
          ) : filteredProducts?.length > 0 ? (
            filteredProducts?.map((product: ProductType, i: number) => (
              <div key={i} className={viewMode === 'list' ? 'bg-white rounded-xl shadow-sm border border-gray-200 p-4' : ''}>
                <ProductCard
                  id={product?.productId}
                  productName={product?.productname}
                  description={product?.description}
                  price={product?.price}
                  loading={false}
                  img={product?.images?.[0]}
                  totalStock={product?.totalStock}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 text-center max-w-md">
                {searchTerm 
                  ? `No products match "${searchTerm}". Try adjusting your search terms.`
                  : "No products available in this category at the moment."
                }
              </p>
              {(searchTerm || selectedPriceRange[0] !== priceRange[0] || selectedPriceRange[1] !== priceRange[1]) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedPriceRange(priceRange);
                  }}
                  className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Quick View</h3>
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={quickViewProduct.images?.[0]}
                    alt={quickViewProduct.productname}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {quickViewProduct.productname}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {quickViewProduct.description}
                  </p>
                  <div className="text-xl font-bold text-pink-600 mb-4">
                    {formatPrice(quickViewProduct.price || 0)}
                  </div>
                  <div className="space-y-3">
                    <button className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200">
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => toggleWishlist(quickViewProduct.productId || '')}
                      className={`w-full py-3 rounded-lg border transition-colors duration-200 ${
                        wishlistItems.includes(quickViewProduct.productId || '')
                          ? 'bg-pink-50 border-pink-300 text-pink-600'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-pink-300'
                      }`}
                    >
                      {wishlistItems.includes(quickViewProduct.productId || '') ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;
