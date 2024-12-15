import React, { useState, useEffect, useRef } from 'react';
import './AboutUs.css';

const AdvancedAboutUs = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState({});
  const sectionRefs = useRef({});

  const testimonials = [
    {
      content: "The quality and freshness of their organic products have transformed my cooking. I can taste the difference in every bite!",
      author: "Emma S."
    },
    {
      content: "Not only are their products amazing, but their commitment to sustainability is truly commendable. I feel good supporting this business.",
      author: "David L."
    },
    {
      content: "From farm to table, the care and passion they put into their products is evident. It's more than food; it's a lifestyle.",
      author: "Sophia R."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(prev => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach(
      (ref) => ref && observer.observe(ref)
    );

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleTestimonialClick = (index) => {
    setActiveTestimonial(index);
  };

  return (
    <div className="about-us">
      <section className="hero">
        <div className="hero-content">
          <h1>Nurturing Nature, Nourishing You</h1>
          <p>Discover the pure essence of organic living</p>
        </div>
      </section>

      <section 
        ref={el => sectionRefs.current['story'] = el} 
        id="story" 
        className={`section story ${isIntersecting['story'] ? 'fade-in' : ''}`}
      >
        <div className="story-content">
          <h2 className={`section-title ${isIntersecting['story'] ? 'visible' : ''}`}>Our Journey</h2>
          <p>
            Founded in 2010, our journey began with a simple yet powerful vision: to reconnect people with the essence of pure, organic nourishment. What started as a small family farm has blossomed into a thriving community of farmers, artisans, and conscious consumers, all united by a shared passion for sustainable living and wholesome food.
          </p>
          <p>
            Today, we continue to grow, innovate, and inspire, always staying true to our roots and our unwavering commitment to the health of our planet and its people. Every product we offer is a testament to this journey - a journey of love, respect, and harmony with nature.
          </p>
        </div>
        <img src="https://wallpapercave.com/w200/wp10648986.jpg" alt="Our organic farm" className="story-image" />
      </section>

      <section 
        ref={el => sectionRefs.current['values'] = el} 
        id="values" 
        className={`section values ${isIntersecting['values'] ? 'fade-in' : ''}`}
      >
        <h2 className={`section-title ${isIntersecting['values'] ? 'visible' : ''}`}>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3>Sustainability</h3>
            <p>We nurture the earth that nurtures us, employing regenerative farming practices to ensure a healthier planet for generations to come.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Community</h3>
            <p>We believe in the power of community, fostering strong relationships with local farmers, artisans, and customers to create a resilient food ecosystem.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🍎</div>
            <h3>Quality</h3>
            <p>We are uncompromising in our commitment to quality, ensuring that every product we offer meets the highest standards of purity and nutrition.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💚</div>
            <h3>Transparency</h3>
            <p>We believe in open, honest communication about our products and practices, empowering our customers to make informed choices.</p>
          </div>
        </div>
      </section>

      <section 
        ref={el => sectionRefs.current['team'] = el} 
        id="team" 
        className={`section team ${isIntersecting['team'] ? 'fade-in' : ''}`}
      >
        <h2 className={`section-title ${isIntersecting['team'] ? 'visible' : ''}`}>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://media.istockphoto.com/photos/old-farmer-holding-digital-tablet-picture-id547133100?b=1&k=20&m=547133100&s=170667a&w=0&h=TzaClWim4cPhK25MQEfgmVQlKdzluRqQdr15Ac8WEME=" alt="Jane Doe" />
            <div className="team-member-info">
              <h3>Jane Doe</h3>
              <p>Founder & Visionary</p>
            </div>
          </div>
          <div className="team-member">
            <img src="https://media.istockphoto.com/photos/old-farmer-holding-digital-tablet-picture-id547133100?b=1&k=20&m=547133100&s=170667a&w=0&h=TzaClWim4cPhK25MQEfgmVQlKdzluRqQdr15Ac8WEME=" alt="John Smith" />
            <div className="team-member-info">
              <h3>John Smith</h3>
              <p>Master Farmer</p>
            </div>
          </div>
          <div className="team-member">
            <img src="https://media.istockphoto.com/photos/old-farmer-holding-digital-tablet-picture-id547133100?b=1&k=20&m=547133100&s=170667a&w=0&h=TzaClWim4cPhK25MQEfgmVQlKdzluRqQdr15Ac8WEME=" alt="Emily Brown" />
            <div className="team-member-info">
              <h3>Emily Brown</h3>
              <p>Sustainability Expert</p>
            </div>
          </div>
          <div className="team-member">
            <img src="https://media.istockphoto.com/photos/old-farmer-holding-digital-tablet-picture-id547133100?b=1&k=20&m=547133100&s=170667a&w=0&h=TzaClWim4cPhK25MQEfgmVQlKdzluRqQdr15Ac8WEME=" alt="Michael Lee" />
            <div className="team-member-info">
              <h3>Michael Lee</h3>
              <p>Community Liaison</p>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={el => sectionRefs.current['timeline'] = el} 
        id="timeline" 
        className={`section timeline ${isIntersecting['timeline'] ? 'fade-in' : ''}`}
      >
        <h2 className={`section-title ${isIntersecting['timeline'] ? 'visible' : ''}`}>Our Growth</h2>
        <div className="timeline-item left">
          <div className="timeline-content">
            <h3>2010</h3>
            <p>Founded as a small family farm with a vision for organic, sustainable agriculture.</p>
          </div>
        </div>
        <div className="timeline-item right">
          <div className="timeline-content">
            <h3>2013</h3>
            <p>Expanded to partner with local farmers, creating a network of organic producers.</p>
          </div>
        </div>
        <div className="timeline-item left">
          <div className="timeline-content">
            <h3>2016</h3>
            <p>Launched our e-commerce platform, bringing organic products directly to consumers nationwide.</p>
          </div>
        </div>
        <div className="timeline-item right">
          <div className="timeline-content">
            <h3>2019</h3>
            <p>Implemented regenerative farming practices across our entire network, further enhancing sustainability.</p>
          </div>
        </div>
        <div className="timeline-item left">
          <div className="timeline-content">
            <h3>2022</h3>
            <p>Achieved carbon-neutral status and expanded our product line to include artisanal, organic-based goods.</p>
          </div>
        </div>
      </section>

      <section 
        ref={el => sectionRefs.current['testimonials'] = el} 
        id="testimonials" 
        className={`section testimonials ${isIntersecting['testimonials'] ? 'fade-in' : ''}`}
      >
        <h2 className={`section-title ${isIntersecting['testimonials'] ? 'visible' : ''}`}>What Our Customers Say</h2>
        <div className="testimonial-slider">
          <div 
            className="testimonial-slide" 
            style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-content">{testimonial.content}</p>
                <p className="testimonial-author">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-dot ${index === activeTestimonial ? 'active' : ''}`}
              onClick={() => handleTestimonialClick(index)}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="section cta">
        <h2 className="section-title">Join Our Organic Revolution</h2>
        <p>Experience the difference of truly organic, sustainably-sourced products.</p>
        <a href="/shop" className="cta-button">Shop Now</a>
      </section>
    </div>
  );
};

export default AdvancedAboutUs;

