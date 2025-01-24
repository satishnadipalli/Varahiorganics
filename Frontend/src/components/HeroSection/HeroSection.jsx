
import { useState, useEffect } from 'react'
// import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Leaf, ShoppingBag, ArrowRight } from 'lucide-react'
import './HeroSection.css'
import { Link, useNavigate } from 'react-router-dom'

const products = [
  { name: 'Organic Rice', image: 'https://img.freepik.com/free-photo/overhead-view-bowls-with-red-brown-white-rice-bowls_23-2147883320.jpg?size=626&ext=jpg', description: 'Pure, aromatic grains', _id:"676bf718e56d837f6411dc68" },
  { name: 'Honey', image: 'https://masalamonk.com/wp-content/uploads/2024/05/Honey-1.jpg', description: 'Pattu Teaney',_id:"676bee288a637338c5920889" },
  { name: 'Organic Jaggery ', image: 'https://www.wildturmeric.net/wp-content/uploads/2017/03/026-1024x1536.jpg', description: 'Thati Bellam/Palm Jaggery',_id:"676ba9033060423fc482f792" },
  { name: 'Cashew nuts', image: 'https://d3kgrlupo77sg7.cloudfront.net/media/chococoorgspice.com/images/products/organic-coorg-cashew-nuts-500-gm-coorg-dry-fruits-whole-big-size.20220919003557.webp', description: 'Organic & Pesticide-Free ' },
]

export default function PremiumResponsiveHero() {
  const [currentProduct, setCurrentProduct] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (!isHovering) {
      const timer = setInterval(() => {
        setCurrentProduct((prev) => (prev + 1) % products.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isHovering])

  return (
    <section className="hero-section-hm">
      <div className="background-pattern-hm" />

      <div className="main-content-hm" style={{width:"100%",gap:"60px"}}>
        <div className="content-panel-hm" style={{}}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="content-container-hm"
          >
            <h1 className="hero-title-hm">
              Nature's Finest,<br />Delivered Fresh
            </h1>
            <p className="hero-subtitle-hm">
              Experience the purity of organic rice, dal, sweets, and farm-fresh produce at your doorstep.
            </p>
            <div className="button-container-hm">
              <Link to={`/store`} style={{textDecoration:"none"}}>
                <motion.button
                  className="button-hm primary-button-hm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Products
                  <ChevronRight className="ml-2" size={20} />
                </motion.button>
              </Link>
              <Link to={`/store`} style={{textDecoration:"none"}}>
                <motion.button
                  className="button-hm secondary-button-hm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="mr-2" size={20} />
                  Shop Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="product-showcase-hm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct}
              className="product-image-hm"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={products[currentProduct].image}
                alt={products[currentProduct].name}
                layout="fill"
                objectFit="cover"
              />
              <div className="product-overlay-hm" />
              <div className="product-info-hm">
                <h2 className="product-title-hm">{products[currentProduct].name}</h2>
                <p className="product-description-hm">{products[currentProduct].description}</p>
                <motion.button
                  className="learn-more-button-hm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={()=>navigate(`/product/${products[currentProduct]?._id}`)}
                >
                  View product
                  <ArrowRight className="ml-2" size={16} />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
          <div 
            className="product-nav-hm"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
          </div>
        </div>
      </div>

      <motion.div 
        className="decorative-leaf-hm leaf-top-left-hm"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut"
        }}
      >
        <Leaf size={48} />
      </motion.div>

      <motion.div 
        className="decorative-leaf-hm leaf-bottom-right-hm"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut"
        }}
      >
        <Leaf size={64} />
      </motion.div>
    </section>
  )
}

