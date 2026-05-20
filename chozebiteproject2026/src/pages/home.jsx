import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Deals from '../components/Deals';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Deals />
      <WhyUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
