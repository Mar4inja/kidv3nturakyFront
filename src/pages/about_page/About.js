import React from "react";
import Navbar from "../../components/navbar/Navbar";
import styles from "./About.module.css";
import aboutBackgroundImage from "../../assets/fons.jpg"


const About = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
      <div className={styles["background-container"]}>
        <img
          src={aboutBackgroundImage}
          alt="Background"
          className={styles["background-image"]} // Izmantojiet klases no CSS moduļa
        />
      </div>
        <div className={styles.section}>
          <h1 className={styles.header}>About Us</h1>
          <p className={styles.text}>
            KidVenturaKi is the ultimate online platform for children, offering
            educational games and quizzes. Our mission is to make learning a fun
            and exciting adventure through interactive and educational content.
            We provide a variety of quizzes and games suitable for different age
            groups and interests, including mathematics, science, geography, and
            much more. Our interactive quizzes help reinforce what is learned in
            the classroom and introduce children to new concepts in a fun and
            memorable way. Each quiz adheres to educational standards, ensuring
            that the content is both relevant and valuable. To motivate
            children, we have included a virtual rewards system where they can
            earn rewards for their achievements. Additionally, our leaderboard
            system encourages healthy competition, encouraging children to
            improve their scores and strive for excellence. KidVenturaKi is
            designed with user-friendly interfaces and vibrant graphics to
            attract and retain the attention of young learners. Parents and
            educators can rest assured that all content is carefully vetted and
            suitable for children. We are committed to providing a safe and
            enriching environment where children can explore and learn. Future
            Plans in the Quiz Industry
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.header}>Our Future plans</h2>
          <p className={styles.text}>
          <h1 className={styles.text}>About KidVenturaKi future plans</h1>
            KidVenturaKi is constantly looking for ways to improve and expand
            its offerings to provide the best educational experiences for
            children. Our future plans include the development of new and
            exciting games that cover an even wider range of topics and age
            groups. We are working to incorporate augmented reality (AR) and
            artificial intelligence (AI) technologies to create even more
            immersive and interactive learning experiences. Additionally, we
            plan to create more collaboration opportunities among children,
            promoting teamwork and collective problem-solving. Our goal is to
            create a global education platform where children from all over the
            world can learn together, share their achievements, and inspire each
            other. The virtual rewards system and leaderboards will be expanded
            to offer even more opportunities for children to earn and showcase
            their skills. We plan to introduce special themed weeks and monthly
            challenges to capture children's attention and encourage regular
            participation on the platform. Collaboration with schools and
            educational institutions is also a priority for us. We want
            KidVenturaKi to become a valuable resource for educators, offering
            tailored materials and tools to help integrate our games and quizzes
            into the learning process. Our vision is to become the leading
            educational games and quiz platform that makes learning an integral
            and enjoyable part of children's daily lives. We believe that with
            innovative solutions and engaging content, we can foster a love of
            learning in children and help them reach their fullest potentials.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
