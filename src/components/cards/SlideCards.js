import React, { useEffect, useRef } from "react";
import styles from "./slideCards.module.css"; // Import the CSS module
import img1 from "../../assets/quiz/math.jpg";
import img2 from "../../assets/quiz/colors.jpg";    //shapes, fairytail, read
import img3 from "../../assets/quiz/geography.jpg";
import img4 from "../../assets/quiz/fairytale.jpg";
import img5 from "../../assets/quiz/read.jpg";

const SlideCards = () => {
  const nextDomRef = useRef(null);
  const prevDomRef = useRef(null);
  const carouselDomRef = useRef(null);
  const timeDomRef = useRef(null);

  useEffect(() => {
    const nextDom = nextDomRef.current;
    const prevDom = prevDomRef.current;
    const carouselDom = carouselDomRef.current;
    const SliderDom = carouselDom.querySelector(`.${styles.list}`);
    const thumbnailBorderDom = carouselDom.querySelector(
      `.${styles.thumbnail}`
    );
    const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(
      `.${styles.item}`
    );
    const timeDom = timeDomRef.current;

    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    let timeRunning = 3000;
    let timeAutoNext = 7000;

    const showSlider = (type) => {
      let SliderItemsDom = SliderDom.querySelectorAll(`.${styles.item}`);
      let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(
        `.${styles.item}`
      );

      if (type === "next") {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add(styles.next);
      } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(
          thumbnailItemsDom[thumbnailItemsDom.length - 1]
        );
        carouselDom.classList.add(styles.prev);
      }
      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove(styles.next);
        carouselDom.classList.remove(styles.prev);
      }, timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
    };

    nextDom.onclick = () => {
      showSlider("next");
    };

    prevDom.onclick = () => {
      showSlider("prev");
    };

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);

    return () => {
      clearTimeout(runTimeOut);
      clearTimeout(runNextAuto);
    };
  }, []);

  return (
    <div className={styles.carousel} ref={carouselDomRef}>
      <div className={styles.list}>
        <div className={styles.item}>
          <img src={img1} alt="Slide 1" />
          <div className={styles.content}>
            <div className={styles.author}>KidVenturaki</div>
            <div className={styles.title}>Math Quiz</div>
            <div className={styles.topic}>Math</div>
            <div className={styles.des}>
              Math quiz is a fun and engaging way for children to practice their
              math skills while having fun. It challenges them to solve
              mathematical problems, which helps improve their critical thinking
              and problem-solving abilities. Additionally, participating in math
              quizzes can boost their confidence in mathematics and make
              learning more enjoyable.
            </div>
            <div className={styles.buttons}>
              <button>SEE MORE</button>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={img2} alt="Slide 2" />
          <div className={styles.content}>
            <div className={styles.author}>KidVenturaki</div>
            <div className={styles.title}>Color Quiz</div>
            <div className={styles.topic}>Colors</div>
            <div className={styles.des}>
              Color quiz is an exciting activity for children to learn about
              colors in a fun and interactive way. It involves identifying
              different colors, matching colors to objects, and exploring the
              world of color theory. Engaging in color quizzes helps children
              develop their color recognition skills, enhance their creativity,
              and expand their knowledge of the visual world around them.
            </div>
            <div className={styles.buttons}>
              <button>SEE MORE</button>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={img3} alt="Slide 3" />
          <div className={styles.content}>
            <div className={styles.author}>KidVenturaki</div>
            <div className={styles.title}>Geography Quiz</div>
            <div className={styles.topic}>Geography</div>
            <div className={styles.des}>
              A Shape Quiz is an engaging educational activity where children
              learn about various shapes and their properties. Through
              interactive quizzes, children can identify different shapes,
              recognize their attributes, and understand how shapes are used in
              everyday objects and structures. Participating in shape quizzes
              fosters children's spatial awareness, problem-solving skills, and
              geometric understanding. It's a fun and effective way for children
              to explore the fascinating world of shapes!
            </div>
            <div className={styles.buttons}>
              <button>SEE MORE</button>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={img4} alt="Slide 4" />
          <div className={styles.content}>
            <div className={styles.author}>KidVenturaki</div>
            <div className={styles.title}>A Fairy Tale Quiz</div>
            <div className={styles.topic}>Fairy Tale</div>
            <div className={styles.des}>
              A Fairy Tale Quiz is an enchanting activity that takes children on
              a magical journey through beloved fairy tales. In this quiz,
              children explore the captivating worlds of princesses, dragons,
              wizards, and mythical creatures. They encounter iconic characters,
              solve riddles, and unravel the mysteries of timeless stories.
              Fairy Tale Quizzes not only entertain but also inspire creativity,
              imagination, and a love for storytelling. Through these quizzes,
              children can discover the wonder and excitement of fairy tales
              while enhancing their reading comprehension and critical thinking
              skills.
            </div>
            <div className={styles.buttons}>
              <button>SEE MORE</button>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={img5} alt="Slide 5" />
          <div className={styles.content}>
            <div className={styles.author}>KidVenturaki</div>
            <div className={styles.title}>Reading Quiz</div>
            <div className={styles.topic}>Read</div>
            <div className={styles.des}>
              A Reading Quiz is an engaging activity designed to enhance
              children's literacy skills and foster a love for reading. In a
              Reading Quiz, children explore a variety of literary genres,
              including fiction, non-fiction, poetry, and more. They encounter
              intriguing passages, thought-provoking questions, and challenging
              vocabulary, all aimed at improving their reading comprehension and
              critical thinking abilities. Reading Quizzes not only test
              children's understanding of the text but also encourage them to
              explore new ideas, analyze characters and plotlines, and express
              their opinions. By participating in Reading Quizzes, children
              develop essential literacy skills while discovering the joy and
              importance of reading.
            </div>
            <div className={styles.buttons}>
              <button>SEE MORE</button>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        {/* Повторите блок для других элементов */}
      </div>
      <div className={styles.thumbnail}>
        <div className={styles.item}>
          <img src={img1} alt="Thumbnail 1" />
          <div className={styles.content}>
            <div className={styles.title}>Name Slider</div>
            <div className={styles.description}>Description</div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={img2} alt="Thumbnail 2" />
          <div className={styles.content}>
            <div className={styles.title}>Name Slider</div>
            <div className={styles.description}>Description</div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={img3} alt="Thumbnail 3" />
          <div className={styles.content}>
            <div className={styles.title}>Name Slider</div>
            <div className={styles.description}>Description</div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={img4} alt="Thumbnail 4" />
          <div className={styles.content}>
            <div className={styles.title}>Name Slider</div>
            <div className={styles.description}>Description</div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={img5} alt="Thumbnail 5" />
          <div className={styles.content}>
            <div className={styles.title}>Name Slider</div>
            <div className={styles.description}>Description</div>
          </div>
        </div>
        {/* Повторите блок для других миниатюр */}
      </div>
      <div className={styles.arrows}>
        <button id="prev" ref={prevDomRef}>
          &lt;
        </button>
        <button id="next" ref={nextDomRef}>
          &gt;
        </button>
      </div>
      <div className={styles.time} ref={timeDomRef}></div>
    </div>
  );
};

export default SlideCards;
