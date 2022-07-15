import style from './Home.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import sample1 from './images/sample/sample1.webp';
import sample2 from './images/sample/sample2.webp';
import sample3 from './images/sample/sample3.webp';
import sample4 from './images/sample/sample4.webp';
import samplePhoto from './images/sample/samplePhoto1.webp';

const samples = [sample1, sample2, sample3, sample4, samplePhoto];

export default function Home() {
  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <div className={style.headerWrapper}>
          <div className={style.logo}></div>
        </div>
      </header>

      <main className={style.main}>
        <div className={style.mainWrapper}>
          <div className={style.mainText}>
            {' '}
            Приложение поможет Вам быстро и качественно создать наклейки-подписи
            в электрические щиты
          </div>

          <div className={style.mainText}>
            {' '}
            Примеры созданных в Electrical Stickers наклеек:
          </div>

          <div className={style.samples}>
            {samples.map((i, index) => (
              <div className={style.sample} key={index}>
                <img
                  className={style.sampleImg}
                  src={i}
                  alt={`Пример ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className={style.linkWrapper}>
            <Link className={style.link} to="/constructor">
              Перейти в конструктор
            </Link>
          </div>
        </div>
      </main>

      <footer className={style.footer}>
        <div className={style.footerWrapper}>
          <div className={style.copyright}>Copyright © 2022</div>
          <div className={style.developerLink}>
            <a
              href="https://nicolasolenev.github.io/"
              target="_blank"
              rel="noreferrer"
            >
              Developer's website
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
