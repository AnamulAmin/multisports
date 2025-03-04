import Carousel from "../../../components/Home/Carousel";

const Test = () => {
    return (
        <div>
            <CarouselExample></CarouselExample>
        </div>
    );
};
const CarouselExample = () => {
    const slides = [
      { id: 1, content: 'Slide 1' },
      { id: 2, content: 'Slide 2' },
      { id: 3, content: 'Slide 3' },
    ];
  
    return (
      <Carousel
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation={true}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="h-64 bg-gray-200 flex items-center justify-center">
            <h2 className="text-lg font-semibold">{slide.content}</h2>
          </div>
        ))}
      </Carousel>
    );
  };

export default Test;