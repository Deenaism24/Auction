// src/pages/information/index.tsx
import React, { useRef } from 'react';
import * as styles from './Information.module.css';
import { routes } from '../routes';

const InformationPage: React.FC = () => {
  const dummySearchInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <section id={routes.ANCHOR_PREFERRED_ACCESS} className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>PREFERRED ACCESS</h2>
        <div className={styles.sectionContent}>
          <p className={styles.sectionText}>
            Получите эксклюзивный доступ к ранним просмотрам аукционов, специальным мероприятиям и
            индивидуальным консультациям с нашими специалистами. Узнайте, как стать участником программы
            Preferred Access и получить привилегии, недоступные другим.
          </p>
          <p className={styles.sectionText}>
            Наша программа Preferred Access создана для самых взыскательных коллекционеров и инвесторов,
            которые ценят время и стремятся к максимальной эффективности на аукционе.
          </p>
          <ul className={styles.sectionList}>
            <li>Приглашения на закрытые показы</li>
            <li>Приоритетная регистрация на торги</li>
            <li>Индивидуальная поддержка менеджера</li>
            <li>Доступ к аналитике рынка</li>
          </ul>
        </div>
      </section>

      {/* About Section */}
      <section id={routes.ANCHOR_ABOUT} className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>ABOUT US</h2>
        <div className={styles.sectionContent}>
          <p className={styles.sectionText}>
            Auction.com — это ведущая онлайн-платформа для покупки и продажи редких и ценных предметов искусства,
            антиквариата, коллекционных автомобилей и многого другого. Наша миссия — сделать мир аукционов
            доступным и прозрачным для всех, от опытных коллекционеров до новичков.
          </p>
          <p className={styles.sectionText}>
            Мы гордимся нашей репутацией надежного партнера, предлагающего только подлинные лоты,
            подтвержденные экспертами. Наша команда состоит из профессионалов с многолетним опытом работы
            на международном рынке аукционов.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id={routes.ANCHOR_SERVICES} className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>SERVICES</h2>
        <div className={styles.sectionContent}>
          <p className={styles.sectionText}>
            Auction.com предлагает полный спектр услуг для покупателей и продавцов, чтобы сделать ваш опыт
            максимально комфортным и выгодным. Наши услуги включают:
          </p>
          <ul className={styles.sectionList}>
            <li>Оценка и экспертиза предметов</li>
            <li>Консультации по продаже и покупке</li>
            <li>Логистика и доставка по всему миру</li>
            <li>Страхование лотов</li>
            <li>Финансовые услуги и кредитование под залог</li>
            <li>Индивидуальные программы для VIP-клиентов</li>
          </ul>
          <p className={styles.sectionText}>
            Мы готовы предоставить комплексную поддержку на каждом этапе вашего взаимодействия с аукционом.
          </p>
        </div>
      </section>

      <section id={routes.ANCHOR_HOW_TO_BUY_SELL} className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>КАК КУПИТЬ ИЛИ ПРОДАТЬ</h2>
        <div className={styles.howToBuySellSectionContent}>
          <div>
            <h3 className={styles.stepTitle}>Как купить:</h3>
            <ol className={styles.howToBuySellStepsList}>
              <li>Пройдите регистрацию на сайте и верифицируйте аккаунт.</li>
              <li>Ознакомьтесь с каталогом предстоящих аукционов и лотов.</li>
              <li>Сделайте предварительную ставку или участвуйте в торгах в реальном времени.</li>
              <li>В случае выигрыша, оплатите лот и оформите доставку.</li>
              <li>Получите ваш приобретенный предмет.</li>
            </ol>
          </div>

          <div>
            <h3 className={styles.stepTitle}>Как продать:</h3>
            <ol className={styles.howToBuySellStepsList}>
              <li>Свяжитесь с нашими специалистами для первичной консультации и оценки.</li>
              <li>Предоставьте детальную информацию и фотографии предмета.</li>
              <li>Подпишите договор о выставлении на аукцион.</li>
              <li>Доставьте предмет в наш офис или договоритесь о заборе.</li>
              <li>После успешной продажи, получите расчет.</li>
            </ol>
          </div>
          <p className={styles.sectionText}>
            Мы сопровождаем вас на каждом этапе процесса, обеспечивая безопасность и прозрачность сделки.
          </p>
        </div>
      </section>
    </>
  );
};

export default InformationPage;