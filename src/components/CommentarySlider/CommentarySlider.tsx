import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const commentaries = [
  {
    name: "Fernanda",
    country: "Brazil",
    commentary: "When I first started, I couldn't say a word in English. Now I feel so much more confident!"
  },
  {
    name: "Hugo",
    country: "Spain",
    commentary: "I love the materials we use in class. They’re really visual and help me understand everything better."
  },
  {
    name: "Lina",
    country: "China",
    commentary: "The classes are well-structured. Fátima explains everything clearly and has so much patience."
  },
  {
    name: "Camila",
    country: "Colombia",
    commentary: "Such a great experience! I now feel confident speaking English when I travel."
  },
  {
    name: "Emir",
    country: "Turkey",
    commentary: "I appreciate the dedication. Each class is adapted to my goals and learning style."
  },
  {
    name: "Carla",
    country: "Chile",
    commentary: "Learning real-life English with Fátima has been a game-changer. I work with native speakers and I can finally understand them!"
  },
  {
    name: "Eleni",
    country: "Cyprus",
    commentary: "I started learning English just for fun, and now I can hold basic conversations. Her resources make it so enjoyable."
  },
  {
    name: "Nicolás",
    country: "Bolivia",
    commentary: "Fátima’s energy is contagious! Her activities keep me engaged and I always feel like I’m making real progress."
  }
];

const CommentarySlider: React.FC = () => {
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handleNext = () => {
    setDirection("right");
    setCount((prev) => (prev + 1) % commentaries.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCount((prev) => (prev - 1 + commentaries.length) % commentaries.length);
  };

  const current = commentaries[count];

  const variants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? 50 : -50,
      opacity: 0,
      top: 0,
      left: 0,
      width: "100%",
    }),
    center: {
      x: 0,
      opacity: 1,
      top: 0,
      left: 0,
      width: "100%",
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -50 : 50,
      opacity: 0,
      top: 0,
      left: 0,
      width: "100%",
    }),
};


  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between px-4">
      {/* Flèche gauche */}
      <button onClick={handlePrev} className="p-3 bg-redText text-white rounded-full hover:bg-red-700 transition">
        <ChevronLeft size={28} />
      </button>

      {/* Cadre fixe */}
      <div className="flex-1 mx-6 text-center bg-white/10 p-6 h-[200px] rounded-xl backdrop-blur-md shadow-md flex flex-col justify-center items-center  overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={count}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="text-center px-4" // 👈 largeur stable
          >
            <h3 className="text-xl font-bold mb-2">
              {current.name} from {current.country}
            </h3>
            <p className="text-lg italic text-balance">{`"${current.commentary}"`}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Flèche droite */}
      <button onClick={handleNext} className="p-3 bg-redText text-white rounded-full hover:bg-red-700 transition">
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default CommentarySlider;
