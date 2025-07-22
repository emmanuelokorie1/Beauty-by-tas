"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import HeaderText from "../../Components/HeaderText"
import CustomButton from "../../Components/CustomButton"
import { IoIosArrowForward } from "react-icons/io"
import { FaPlay } from "react-icons/fa"
import { GoHeart } from "react-icons/go"

// Import placeholder images - replace with actual images
import heroImage from "../../assets/discover/hero-discover.avif"
import tutorialThumb1 from "../../assets/discover/hero-discover.avif"
import tutorialThumb2 from "../../assets/discover/hero-discover.avif"
import tutorialThumb3 from "../../assets/discover/hero-discover.avif"
import lookbook1 from "../../assets/discover/hero-discover.avif"
import lookbook2 from "../../assets/discover/hero-discover.avif"
import lookbook3 from "../../assets/discover/hero-discover.avif"
import trendImage1 from "../../assets/discover/hero-discover.avif"
import trendImage2 from "../../assets/discover/hero-discover.avif"
import blogImage1 from "../../assets/discover/blog1.avif"
import blogImage2 from "../../assets/discover/blog2.avif"
import blogImage3 from "../../assets/discover/blog3.avif"
import { images } from "../../constants"

function Discover() {
  const [activeTab, setActiveTab] = useState("All")

  const tabs = ["All", "Tutorials", "Trends", "Lookbooks", "Tips"]

  const featuredContent = [
    {
      id: 1,
      type: "tutorial",
      title: "Perfect Winged Eyeliner in 3 Steps",
      description: "Master the art of winged eyeliner with our easy step-by-step guide",
      image: tutorialThumb1,
      duration: "5 min",
      category: "Tutorials",
    },
    {
      id: 2,
      type: "trend",
      title: "Summer Glow Makeup Trends 2024",
      description: "Discover the hottest makeup trends for a radiant summer look",
      image: trendImage1,
      readTime: "3 min read",
      category: "Trends",
    },
    {
      id: 3,
      type: "lookbook",
      title: "Everyday Natural Look",
      description: "Effortless beauty for your daily routine",
      image: lookbook1,
      products: "5 products",
      category: "Lookbooks",
    },
  ]

  const tutorials = [
    {
      id: 1,
      title: "Perfect Winged Eyeliner",
      thumbnail: tutorialThumb1,
      duration: "5:32",
      views: "12.5K",
    },
    {
      id: 2,
      title: "Glowing Skin Routine",
      thumbnail: tutorialThumb2,
      duration: "8:15",
      views: "8.2K",
    },
    {
      id: 3,
      title: "Bold Lip Application",
      thumbnail: tutorialThumb3,
      duration: "3:45",
      views: "15.1K",
    },
  ]

  const trends = [
    {
      id: 1,
      title: "Glass Skin Effect",
      image: trendImage1,
      description: "Achieve that coveted dewy, translucent complexion",
      tag: "Trending",
    },
    {
      id: 2,
      title: "Sunset Eyes",
      image: trendImage2,
      description: "Warm, golden eyeshadow looks inspired by sunset hues",
      tag: "Hot",
    },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind Long-Lasting Lipstick",
      excerpt: "Ever wondered why some lipsticks last all day while others fade within hours?",
      image: blogImage1,
      readTime: "4 min read",
      date: "Dec 15, 2024",
      author: "Beauty Expert",
    },
    {
      id: 2,
      title: "Skincare Ingredients That Actually Work",
      excerpt: "Cut through the marketing hype and discover ingredients backed by science",
      image: blogImage2,
      readTime: "6 min read",
      date: "Dec 12, 2024",
      author: "Dr. Sarah Kim",
    },
    {
      id: 3,
      title: "Building Your Perfect Makeup Kit",
      excerpt: "Essential products every makeup lover should have in their collection",
      image: blogImage3,
      readTime: "5 min read",
      date: "Dec 10, 2024",
      author: "Makeup Artist",
    },
  ]

  const lookbooks = [
    {
      id: 1,
      title: "Office Ready",
      image: lookbook1,
      products: ["Foundation", "Mascara", "Lip Tint"],
    },
    {
      id: 2,
      title: "Date Night Glam",
      image: lookbook2,
      products: ["Eyeshadow Palette", "Highlighter", "Bold Lipstick"],
    },
    {
      id: 3,
      title: "Weekend Casual",
      image: lookbook3,
      products: ["Tinted Moisturizer", "Cream Blush", "Lip Balm"],
    },
  ]

  const filteredContent =
    activeTab === "All" ? featuredContent : featuredContent.filter((item) => item.category === activeTab)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images?.discoverBeauty})` }}
        ></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="fontdm text-4xl md:text-6xl font-bold mb-4">Discover</h1>
          {/* <p cl  */}
          <CustomButton
            text="Start Exploring"
            classNames="bg-primary-deepRed text-white px-8 py-3 text-lg hover:bg-opacity-90 transition-all"
          />
        </div>
      </section>

      {/* Content Tabs */}
      <section className="containers py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === tab ? "bg-primary-deepRed text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Featured Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredContent.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={item.image || `/placeholder.svg?height=300&width=400&query=${item.type}`}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {item.type === "tutorial" && <FaPlay className="text-white text-3xl" />}
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-deepRed text-white px-3 py-1 rounded-full text-sm">{item.category}</span>
                </div>
                {item.duration && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {item.duration}
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary-deepRed transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Tutorials Section */}
      <section className="bg-gray-50 py-12">
        <div className="containers">
          <HeaderText title="Video Tutorials" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={tutorial.thumbnail || `/placeholder.svg?height=200&width=300&query=tutorial+${tutorial.id}`}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <FaPlay className="text-white text-2xl" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {tutorial.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">{tutorial.title}</h4>
                  <p className="text-gray-500 text-sm">{tutorial.views} views</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <CustomButton
              text="View All Tutorials"
              classNames="border border-primary-deepRed text-primary-deepRed hover:bg-primary-deepRed hover:text-white px-6 py-2 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="containers py-12">
        <HeaderText title="Trending Now" />
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {trends.map((trend) => (
            <div key={trend.id} className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={trend.image || `/placeholder.svg?height=400&width=600&query=trend+${trend.id}`}
                  alt={trend.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {trend.tag}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{trend.title}</h3>
                  <p className="text-gray-200">{trend.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lookbook Section */}
      <section className="bg-primary-background py-12">
        <div className="containers">
          <HeaderText title="Curated Lookbooks" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {lookbooks.map((lookbook) => (
              <div
                key={lookbook.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={lookbook.image || `/placeholder.svg?height=300&width=300&query=lookbook+${lookbook.id}`}
                    alt={lookbook.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <GoHeart className="text-white text-2xl hover:text-red-400 cursor-pointer" />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-3">{lookbook.title}</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 font-semibold">Featured Products:</p>
                    {lookbook.products.map((product, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs mr-2 mb-2"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                  <CustomButton
                    text="Shop This Look"
                    classNames="w-full mt-4 bg-primary-deepRed text-white py-2 hover:bg-opacity-90 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beauty Blog */}
      <section className="containers py-12">
        <HeaderText title="Beauty Blog" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={post.image || `/placeholder.svg?height=200&width=300&query=blog+${post.id}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <h3 className="font-bold text-lg mb-3 hover:text-primary-deepRed cursor-pointer transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <NavLink
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary-deepRed hover:underline font-semibold"
                >
                  Read More <IoIosArrowForward className="ml-1" />
                </NavLink>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-8">
          <CustomButton
            text="View All Posts"
            classNames="border border-primary-deepRed text-primary-deepRed hover:bg-primary-deepRed hover:text-white px-6 py-2 transition-all"
          />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-primary-deepRed to-pink-600 text-white py-16">
        <div className="containers text-center">
          <h2 className="fontdm text-3xl md:text-4xl font-bold mb-4">Stay in the Beauty Loop</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Get the latest beauty tips, tutorials, and exclusive content delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none"
            />
            <CustomButton
              text="Subscribe"
              classNames="bg-white text-primary-deepRed px-6 py-3 hover:bg-gray-100 transition-all font-semibold"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Discover
