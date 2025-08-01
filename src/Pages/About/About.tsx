"use client";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
// import HeaderText from "../../Components/HeaderText";
import { FaInstagram, FaTwitter, FaFacebookF, FaTiktok } from "react-icons/fa";

// Import placeholder images - replace with actual images
// import heroImage from "../../assets/about/story1.avif";
// import founderImage from "../../assets/about/story1.avif";
// import storyImage1 from "../../assets/about/story1.avif";
// import storyImage2 from "../../assets/about/story2.avif";
import valuesImage from "../../assets/about/values.avif";
import teamMember1 from "../../assets/about/team2.avif";
import teamMember2 from "../../assets/about/team2.avif";
import teamMember3 from "../../assets/about/team3.avif";
import teamMember4 from "../../assets/about/team4.avif";
import ingredientsImage from "../../assets/about/ingredients.avif";
import sustainabilityImage from "../../assets/about/sustainability.avif";
import testimonialImage1 from "../../assets/about/testimonial2.avif";
import testimonialImage2 from "../../assets/about/testimonial2.avif";
import testimonialImage3 from "../../assets/about/testimonial3.avif";
import { images } from "../../constants";
import { AiFillInstagram, AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { data } from "../../constants/data";
import HeaderText from "../../Components/HeaderText";

function About() {
  const [activeTab, setActiveTab] = useState("Our Story");

  const tabs = ["Our Story", "Our Values", "Our Team", "Our Ingredients"];

  const teamMembers = [
    {
      id: 1,
      name: "Tasleema Lateef",
      role: "Founder & CEO",
      image: teamMember1,
      bio: "With over 10 years in the beauty industry, Tasleema founded BeautyByTas with a vision to create inclusive, high-quality beauty products that celebrate diversity.",
      instagram: "https://instagram.com",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Chief Product Officer",
      image: teamMember2,
      bio: "Sarah oversees product development, ensuring each BeautyByTas product meets our high standards for quality, performance, and sustainability.",
      instagram: "https://instagram.com",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Creative Director",
      image: teamMember3,
      bio: "Michael brings our brand vision to life through compelling visuals, packaging design, and creative campaigns that capture the essence of BeautyByTas.",
      instagram: "https://instagram.com",
    },
    {
      id: 4,
      name: "Aisha Williams",
      role: "Community Manager",
      image: teamMember4,
      bio: "Aisha builds and nurtures our vibrant community, creating spaces for beauty lovers to connect, learn, and share their BeautyByTas experiences.",
      instagram: "https://instagram.com",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Treasure",
      image: testimonialImage1,
      quote:
        "I use beautybytas products because they are made with love. It’s very evident, from the products that are effective and friendly to my skin, to the intention and hardwork that goes into the aesthetics and branding of the company, and the way they keep things innovative, constantly bringing out new products and lines",
      location: "Lagos Nigeria",
    },
    {
      id: 2,
      name: "Feyi",
      image: testimonialImage2,
      quote:
        "it’s not news that i love your products and how intentional you are about packaging. Your gloss is so gentle on the lips and it doesn’t make my lips chapped like other glosses and i love how the lip scrub is not harsh and doesn’t give reactions",
      location: "Lagos Nigeria",
    },
    {
      id: 3,
      name: "Zainab",
      image: testimonialImage3,
      quote:
        "I'm sorry this is coming late but I just want to say Thank you for delivering Quality.I have been so in love with your lip scrub and balm that I have told almost all my friends",
      location: "Lagos Nigeria",
    },
  ];

  const values = [
    {
      title: "Inclusivity",
      description:
        "Creating products that work beautifully for all skin tones and types",
      icon: "✨",
    },
    {
      title: "Quality",
      description:
        "Uncompromising commitment to exceptional product performance",
      icon: "⭐",
    },
    {
      title: "Sustainability",
      description:
        "Mindful practices that respect our planet and its resources",
      icon: "🌱",
    },
    {
      title: "Transparency",
      description:
        "Honest communication about our ingredients, processes, and practices",
      icon: "🔍",
    },
    {
      title: "Community",
      description:
        "Building connections and celebrating beauty in all its forms",
      icon: "💕",
    },
    {
      title: "Innovation",
      description: "Continuously evolving to create better beauty experiences",
      icon: "💡",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${images.ourStory})`,
          }}
        ></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="fontdm text-4xl md:text-6xl font-bold mb-4">
            Our Story
          </h1>
          {/* <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            BeautyByTas was born from a passion for beauty and a commitment to
            inclusivity
          </p> */}
        </div>
      </section>

      {/* Content Tabs */}
      <section className="containers py-12">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === tab
                  ? "bg-primary-deepRed text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Our Story Tab */}
        {activeTab === "Our Story" && (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img
                  src={images.founder}
                  alt="Founder"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div>
                <h2 className="fontdm text-3xl font-bold mb-4">
                  Meet Our Founder
                </h2>
                <p className="text-gray-700 mb-4">
                  Beautybytas.co was founded in 2020 by Taslemat Yusuf.
                  Frustrated by harsh lip care products, she started creating
                  her own gentle, effective solutions. What began as a personal
                  quest for kinder beauty quickly grew into a beloved brand
                </p>
                <p className="text-gray-700 mb-4">
                  Beauty and body care should be accessible, inclusive, and
                  empowering. It should work without harming the environment or
                  our skin," says Taslemat. This philosophy is at the heart of
                  every product we make, ensuring beautiful results that align
                  with your values.
                </p>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="fontdm text-3xl font-bold mb-6 text-center">
                Our Journey
              </h2>
              <div className="relative">
                {/* Timeline vertical line: left on mobile, center on md+ */}
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 bg-primary-deepRed"></div>

                {/* Timeline Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  {/* 2020 */}
                  <div className="md:text-right pl-12 md:pr-12 pt-8 relative">
                    {/* Dot for mobile */}
                    <div className="md:hidden absolute left-4 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    {/* Dot for desktop */}
                    <div className="hidden md:block absolute right-0 top-10 transform translate-x-1/2 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    <h3 className="text-xl font-bold mb-2">2020</h3>
                    <p className="text-gray-700">
                      Started our journey with a Yoruba goddess themed lip gloss
                      collection and our Lip balm
                    </p>
                  </div>
                  <div className="pl-12 md:pt-8"></div>

                  {/* 2021 */}
                  <div className="md:text-right md:pr-12 relative"></div>
                  <div className="pl-12 pt-8 relative">
                    <div className="md:hidden absolute left-4 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    <div className="hidden md:block absolute left-0 top-10 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    <h3 className="text-xl font-bold mb-2">2021</h3>
                    <p className="text-gray-700">
                      Launched the body soufflé and body Polish
                    </p>
                  </div>

                  {/* 2022 */}
                  <div className="md:text-right md:pr-12 pl-12 pt-8 relative">
                    <div className="md:hidden absolute left-4 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    <div className="hidden md:block absolute right-0 top-10 transform translate-x-1/2 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    <h3 className="text-xl font-bold mb-2">2022</h3>
                    <p className="text-gray-700">
                      Introduced our Lip Oils and Body Oils to the collection of
                      products
                    </p>
                  </div>
                  <div className="pl-12 md:pt-8"></div>

                  {/* 2023 */}
                  <div className="md:text-right md:pr-12 relative"></div>
                  <div className="pl-12 pt-8 relative">
                    <div className="md:hidden absolute left-4 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    <div className="hidden md:block absolute left-0 top-10 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    <h3 className="text-xl font-bold mb-2">2023</h3>
                    <p className="text-gray-700">
                      We upgraded our packaging, reducing the usage of stickers
                      on our lip products.
                    </p>
                  </div>

                  {/* 2024 */}
                  <div className="md:text-right md:pr-12 pl-12 pt-8 relative">
                    <div className="md:hidden absolute left-4 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    <div className="hidden md:block absolute right-0 top-10 transform translate-x-1/2 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    <h3 className="text-xl font-bold mb-2">2024</h3>
                    <p className="text-gray-700">
                      We hosted our first community event , “Gloss and Glaze”,
                      collaborated with Aya Care.ng to give out sanitary pads to
                      our community . We also expanded our community outreach by
                      popping up in events such as the Zikoko Hertitude event,
                      Ashluxury Sunday market and many more
                    </p>
                  </div>
                  <div className="pl-12 md:pt-8"></div>

                  {/* 2025 */}
                  <div className="md:text-right md:pr-12 relative"></div>
                  <div className="pl-12 pt-8 relative">
                    <div className="md:hidden absolute left-4 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    <div className="hidden md:block absolute left-0 top-10 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary-deepRed"></div>
                    <h3 className="text-xl font-bold mb-2">2025</h3>
                    <p className="text-gray-700">
                      Celebrated our fifth year anniversary and got our name
                      trademarked
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src={
                    storyImage1 ||
                    "/placeholder.svg?height=400&width=500&query=beauty+products"
                  }
                  alt="Our Products"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div>
                <img
                  src={
                    storyImage2 ||
                    "/placeholder.svg?height=400&width=500&query=beauty+community"
                  }
                  alt="Our Community"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div> */}
          </div>
        )}

        {/* Our Values Tab */}
        {activeTab === "Our Values" && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="fontdm text-3xl font-bold mb-4">
                What We Stand For
              </h2>
              <p className="text-gray-700">
                At BeautyByTas, our values guide everything we do—from product
                development to customer experience. We're committed to creating
                beauty products that not only perform exceptionally but also
                align with our core principles.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img
                  src={images.ourCore}
                  alt="Our Values"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div>
                <h3 className="fontdm text-2xl font-bold mb-6">
                  Our Core Values
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start">
                      <div className="text-3xl mr-4">{value.icon}</div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">
                          {value.title}
                        </h4>
                        <p className="text-gray-700">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="fontdm text-2xl font-bold mb-6 text-center">
                Our Mission
              </h3>
              <p className="text-xl text-center text-gray-700 italic max-w-3xl mx-auto">
                "To empower your beauty journey with effective, handmade
                products crafted with care. We are dedicated to providing
                accessible, inclusive, and gentle beauty solutions that not only
                enhance your natural glow but also align with your values,
                ensuring no harm to your skin or the environment"
              </p>
            </div>
          </div>
        )}

        {/* Our Team Tab */}
        {activeTab === "Our Team" && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="fontdm text-3xl font-bold mb-4">
                The Faces Behind BeautyByTas
              </h2>
              <p className="text-gray-700">
                Our passionate team brings together diverse expertise and a
                shared commitment to our mission. Meet the people who make
                BeautyByTas possible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={
                        member.image ||
                        `/placeholder.svg?height=300&width=300&query=portrait+${member.id}`
                      }
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-primary-deepRed hover:text-white transition-colors"
                    >
                      <FaInstagram size={18} />
                    </a>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-primary-deepRed mb-3">{member.role}</p>
                    <p className="text-gray-700 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <h3 className="fontdm text-2xl font-bold mb-4">Join Our Team</h3>
              <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                We're always looking for passionate individuals to join our
                growing team. Check out our current openings or send us your
                resume.
              </p>
              <CustomButton
                text="View Careers"
                classNames="bg-primary-deepRed text-white px-6 py-3 hover:bg-opacity-90 transition-all"
              />
            </div>
          </div>
        )}

        {/* Our Ingredients Tab */}
        {activeTab === "Our Ingredients" && (
          <div>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="fontdm text-3xl font-bold mb-4">
                  Clean Beauty, Defined
                </h2>
                <p className="text-gray-700 mb-4">
                  At BeautyByTas, we believe in transparency about what goes
                  into our products. We carefully select ingredients that are
                  effective, safe, and ethically sourced.
                </p>
                <p className="text-gray-700 mb-4">
                  Our formulations are free from harmful chemicals and we
                  prioritize natural, plant-based ingredients that deliver
                  results without compromising your health or the environment
                </p>
                <p className="text-gray-700">
                  Every ingredient serves a purpose-whether it's to nourish,
                  protect, or enhance. We never add fillers or unnecessary
                  components to our formulations
                </p>
              </div>
              <div>
                <img
                  src={
                    images?.bestSeller3
                  }
                  alt="Our Ingredients"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg mb-16">
              <h3 className="fontdm text-2xl font-bold mb-6 text-center">
                Our Ingredient Standards
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl mb-4 text-primary-deepRed">🌿</div>
                  <h4 className="font-bold text-lg mb-2">Ethically Sourced</h4>
                  <p className="text-gray-700">
                    We partner with suppliers who share our commitment to
                    ethical practices and fair trade.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl mb-4 text-primary-deepRed">🔬</div>
                  <h4 className="font-bold text-lg mb-2">
                    Scientifically Proven
                  </h4>
                  <p className="text-gray-700">
                    Our ingredients are backed by research to ensure they're
                    both safe and effective.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl mb-4 text-primary-deepRed">🐰</div>
                  <h4 className="font-bold text-lg mb-2">Cruelty-Free</h4>
                  <p className="text-gray-700">
                    We never test on animals and only work with cruelty-free
                    suppliers.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={
                    sustainabilityImage ||
                    "/placeholder.svg?height=500&width=500&query=sustainable+packaging"
                  }
                  alt="Sustainable Packaging"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div>
                <h3 className="fontdm text-2xl font-bold mb-4">
                  Sustainable Packaging
                </h3>
                <p className="text-gray-700 mb-4">
                  Our commitment to the planet extends beyond our ingredients to
                  our packaging. We're continuously working to reduce our
                  environmental footprint through innovative, sustainable
                  packaging solutions.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary-deepRed mr-2">✓</span>
                    <span>
                      Recyclable and biodegradable materials wherever possible
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-deepRed mr-2">✓</span>
                    <span>Minimalist design to reduce waste</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-deepRed mr-2">✓</span>
                    <span>Refillable options for select products</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-deepRed mr-2">✓</span>
                    <span>Plastic-free shipping materials</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">
                  By 2025, we aim to have 100% of our packaging either
                  recyclable, reusable, or compostable.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="containers">
          <HeaderText title="What Our Customers Say" />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={
                      testimonial.image ||
                      `/placeholder.svg?height=60&width=60&query=portrait+${testimonial.id}`
                    }
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="containers py-16">
        <div className="text-center mb-12">
          <h2 className="fontdm text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Join our community on social media to stay updated on new products,
            tutorials, and beauty inspiration.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            {data?.socials?.map((e, i) => {
              return (
                <a href={e?.link} target="_blank" key={i}>
                  <e.Icon color={"#000914"} size={30} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-deepRed text-white py-16">
        <div className="containers text-center">
          <h2 className="fontdm text-3xl md:text-4xl font-bold mb-4">
            Experience BeautyByTas
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover our range of inclusive, high-quality beauty products
            designed to help you express your unique beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/shop"
              className="inline-flex items-center justify-center"
            >
              <CustomButton
                text="Shop Now"
                classNames="bg-white text-primary-deepRed px-8 py-3 hover:bg-gray-100 transition-all font-semibold"
              />
            </NavLink>

            <NavLink
              to="/contact-us"
              className="inline-flex items-center justify-center"
            >
              <CustomButton
                text="Contact Us"
                classNames="border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-primary-deepRed transition-all font-semibold"
              />
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
