import Testimonial from '@/components/Landing/Testimonial';

const Testimonials: React.FC = () => {
  const testimonialsData = [
    {
      rating: 5,
      title: (
        <>
          This is by far the cleanest template <br /> and the most well
          structured
        </>
      ),
      feedback:
        'The most well thought out design theme I have ever used. The codes are up to tandard. The CSS styles are very clean. In fact the cleanest and the most up to standard I have ever seen.',
      avatar: '/media/images/guy.jpg',
      name: 'Paul Miles',
      role: 'Development Lead',
    },
    {
      rating: 5,
      title: (
        <>
          This is by far the cleanest template <br /> and the most well
          structured
        </>
      ),
      feedback:
        'The most well thought out design theme I have ever used. The codes are up to tandard. The CSS styles are very clean. In fact the cleanest and the most up to standard I have ever seen.',
      avatar: '/media/images/guy.jpg',
      name: 'Janya Clebert',
      role: 'Development Lead',
    },
    {
      rating: 5,
      title: (
        <>
          This is by far the cleanest template <br /> and the most well
          structured
        </>
      ),
      feedback:
        'The most well thought out design theme I have ever used. The codes are up to tandard. The CSS styles are very clean. In fact the cleanest and the most up to standard I have ever seen.',
      avatar: '/media/images/guy.jpg',
      name: 'Steave Brown',
      role: 'Development Lead',
    },
  ];

  return (
    <>
      <div className="text-center mb-10">
        <h3 className="text-2xl lg:text-4xl mb-5 font-semibold">
          What Our Clients Say
        </h3>

        <p className="text-gray-600">
          Save thousands to millions of bucks by using single tool <br />
          for different amazing and great useful admin
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10 lg:mb-20">
        {testimonialsData.map((item, index) => (
          <Testimonial
            key={index}
            rating={item.rating}
            title={item.title}
            feedback={item.feedback}
            avatar={item.avatar}
            name={item.name}
            role={item.role}
          />
        ))}
      </div>
    </>
  );
};

export default Testimonials;
