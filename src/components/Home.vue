<template>
  <div class="hero">
    <div class="container">
      <div class="hero__inner">
        <div class="hero__main">
          <h1 class="hero__title">TrustEx</h1>
          <div class="hero__descr">Твоя надежная площадка для р2р обмена</div>
          <a class="btn  btn--main" href="/announcement-list
          ">Начать обмен</a>
        </div>

        <img class="hero__img" src="../assets/img/img__hero.png" alt="">
      </div>
    </div><!-- /.container -->
  </div>

  <div class="features  main-section  main-section--bg-white">

    <div class="container">

      <div class="main-section__header">
        <h2 class="main-section__title">Максимальная безопасность</h2>
      </div>

      <div class="features__inner  main-section__body">

        <div class="features__item">
          <div class="features__pic">
            <svg class='features__icon'>
              <use xlink:href='#img__shield-plus'></use>
            </svg>
          </div>
          <div class="features__text">Многоуровневая система серверной защиты</div>
        </div>

        <div class="features__item">
          <div class="features__pic">
            <svg class='features__icon'>
              <use xlink:href='#img__shield-check'></use>
            </svg>
          </div>
          <div class="features__text">Все платежи проверяются операторами по безопасности</div>
        </div>

        <div class="features__item">
          <div class="features__pic">
            <svg class='features__icon'>
              <use xlink:href='#img__scan'></use>
            </svg>
          </div>
          <div class="features__text">Система контроля качества обработки заявок</div>
        </div>

      </div><!-- /.features__inner -->

    </div><!-- /.container -->

  </div><!-- /.features -->

  <!-- <div class="main-section">

    <div class="main-section__header">
      <h2 class="main-section__title">Мы работаем с</h2>
    </div>

    <div class="main-section__body">

      <div class="container">

        <div class="slider">

          <div class="slider__slides" id="partners">
            <div class="slider__item">
              <img src="../assets/img/img__visa.png" alt="">
            </div>
            <div class="slider__item">
              <img src="../assets/img/img__mastercard.png" alt="">
            </div> -->
          <!-- </div>/.slider__slides -->

          <!-- <div class="slider__arrows" id="partnersArrows">
            <button class="slider__arrow  slider__arrow-left">
              <svg class='slider__icon'>
                <use xlink:href='#icon__chevron-left'></use>
              </svg>
            </button>

            <button class="slider__arrow  slider__arrow-right">
              <svg class='slider__icon'>
                <use xlink:href='#icon__chevron-right'></use>
              </svg>
            </button>
          </div> -->
        <!-- </div>

      </div>

    </div> -->

  <!-- </div> -->

  <div class="main-section">

    <div class="container">

      <div class="main-section__header">
        <h2 class="main-section__title"> Последние новости</h2>
      </div>

      <div class="main-section__body">

        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="news-card">
              <div class="news-card__thumb">
                <img class="news-card__img" src="../assets/img/news-1.webp" alt="">
              </div>
              <p class="news-card__descr">
                <a href="https://www.akchabar.kg/ru/news/stejblkoin-mozhet-li-kriptovalyuta-byt-stabilnoj/">Стейблкоин: может ли криптовалюта быть стабильной?</a>
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="news-card">
              <div class="news-card__thumb">
                <img class="news-card__img" src="../assets/img/news-2.jpeg" alt="">
              </div>
              <p class="news-card__descr">
                <a href="https://kaktus.media/doc/462742_cherez_mesiac_vstypit_v_sily_zakon_regyliryushiy_kriptobiznes_v_kyrgyzstane._chto_nyjno_znat.html">Вступает в силу закон, регулирующий криптобизнес в Кыргызстане.</a>
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="news-card">
              <div class="news-card__thumb">
                <img class="news-card__img" src="../assets/img/news-3.webp" alt="">
              </div>
              <p class="news-card__descr">
                <a href="https://vc.ru/crypto/432505-chto-takoe-algoritmicheskie-steyblkoiny">Что такое Алгоритмические Стейблкоины?</a>
              </p>
            </div>
          </div>
        </div>
      </div><!-- /.main-section__body -->

    </div><!-- /.container -->

  </div><!-- /.main-section -->

  <div class="main-faq">
    <div class="container">
      <div class="main-faq__header">
        <h2 class="main-faq__title">Часто задаваемые вопросы</h2>
      </div>

      <div class="main-section__body">
        <div class="accordion accordion-flush" id="accordionFlus">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed line" 
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne">
                1) Что такое TrustEx?
                <img src="../assets/img/icon_arrow-down.svg" alt="icon_arrow-down">
              </button>
             
              
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample" >
              <div class="accordion-body">
                Добро пожаловать на TrustEx — пиринговую (P2P) платформу для
                торговли тезерами!
                <br />На нашей платформе вы можете торговать криптовалютой с
                другими пользователями TrustEx со всего Кыргызстана.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button
                class="accordion-button collapsed line"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo">
                2) Какой официальный сайт TrustEx?
                <img src="../assets/img/icon_arrow-down.svg" alt="icon_arrow-down">
              </button>
              
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <a href="https://trustex.kg/">www.trustex.kg</a>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button
                class="accordion-button collapsed line"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree">
                3) Что вы можете делать на платформе TrustEx?
                <img src="../assets/img/icon_arrow-down.svg" alt="icon_arrow-down">
              </button>
              
            </h2>
            <div
              id="flush-collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                Вы можете покупать у других пользователей TrustEx и продавать им
                Tether (USDT).
                <br />
                Когда вы продаете криптовалюту, вы сами устанавливаете цену и
                выбираете способ оплаты. <br />Вы можете хранить свою
                криптовалюту на нашем бесплатном кошельке. <br />Благодаря
                безопасному счету хранения и профессиональной службе поддержки
                ваши средства находятся под надежной защитой на TrustEx
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingFour">
              <button
                class="accordion-button collapsed line"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFour"
                aria-expanded="false"
                aria-controls="flush-collapseFour">
                4) Можно ли быть уверенным в покупке и продажи USDT на сервисе
                TrustEx?
                <img src="../assets/img/icon_arrow-down.svg" alt="icon_arrow-down">
              </button>
              
            </h2>
            <div
              id="flush-collapseFour"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingFour"
              data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                Преимущества сервиса TrustEx заключается в том что возможность
                продажи и покупки криптовалюты привязана к двухстороннему
                одобрению на перевод, и получение отправленной суммы денег. То
                есть пока платёж не будет подтверждён с обеих сторон, сделка не
                будет считаться завершённой.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingFive">
              <button
                class="accordion-button collapsed line"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFive"
                aria-expanded="false"
                aria-controls="flush-collapseFive">
                5) Как начать торговать на TrustEx?
                <img src="../assets/img/icon_arrow-down.svg" alt="icon_arrow-down">
              </button>
              
            </h2>
            <div
              id="flush-collapseFive"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingFive"
              data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <p class="text text--bold">
                  1. Перейдите на страницу регистрации аккаунта TrustEx
                </p>
                Если вы находитесь на главной странице TrustEx, нажмите на
                "начать обмен", далее перейдите на вкладку Регистрации
                <br />Теперь вам нужно создать аккаунт, указав электронную
                почту, ФИО, Дата рождения и придумать пароль. <br />После
                заполнения указенных полей и нажатия кнопки заегистрировать, на
                указанную вами электронную почту поступит Письмо с подверждением
                электронной почты. <br />Как только вы зарегистрируетесь, вам
                будет необходимо создаит бесплатный криптовалютный кошелек. На
                нем вы сможете хранить всю заработанную криптовалюту.
                <br /><br />
                <p class="text text--bold">2. Пройдите верификацию</p>
                После создания аккаунта вам необходимо подтвердить свою
                личность, прикрепив в поле верификации фотографии паспорта
                <br />Вот и все! Теперь вы можете торговать
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingSix">
              <button
                class="accordion-button collapsed line"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseSix"
                aria-expanded="false"
                aria-controls="flush-collapseSix">
                6) Какие способы оплаты предлагает TrustEx?
                <img src="../assets/img/icon_arrow-down.svg" alt="icon_arrow-down">
              </button>
              
            </h2>
            <div
              id="flush-collapseSix"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingSix"
              data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                Способы оплаты включают в себя:
                <br />1. Кредитные/дебетовые карты <br />2. Онлайн-кошельки
                (ELSOM)
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingSeven">
              <button
                class="accordion-button collapsed line"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseSeven"
                aria-expanded="false"
                aria-controls="flush-collapseSeven">
                7) Имеется ли комиссия платформы TrustEx?
                <img src="../assets/img/icon_arrow-down.svg" alt="icon_arrow-down">
              </button>
              
            </h2>
            <div
              id="flush-collapseSeven"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingSeven"
              data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <p>
                  Когда вы торгуете криптовалютой или переводите средства,
                  комиссия с вас не взимается.
                </p>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingEight">
              <button
                class="accordion-button collapsed line" 
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseEight"
                aria-expanded="false"
                aria-controls="flush-collapseEight">
                8) С какой сетью работает TrustEx?
                <img src="../assets/img/icon_arrow-down.svg" alt="icon_arrow-down">
              </button>
              
            </h2>
            <div
              id="flush-collapseEight"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingEight"
              data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <p>
                  На данный момент сервис работает только с токенами стандарта
                  TRC20
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.main-section__body -->
    </div>
    <!-- /.container -->
  </div>
  <!-- /.main-faq -->

</template>

<script>
/* eslint-disable*/
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    // UserService.getPublicContent().then(
    //   (response) => {
    //     this.content = response.data;
    //   },
    //   (error) => {
    //     this.content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  },
};
</script>
