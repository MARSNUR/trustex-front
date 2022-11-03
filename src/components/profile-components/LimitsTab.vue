<template>
  <div class="tab-pane fade active show" id="limits">

    <div class="x-card  x-card--full-width">

      <div class="x-card__header">
        <h1 class="x-card__title">Лимиты</h1>
      </div>

      <div class="x-card__body">

        <div class="limits-cards">

          <div class="limits-cards__item">
            <div class="limits-cards__header">
              <div class="limits-cards__value">$250</div>
              <div class="limits-cards__descr">в день</div>
              <a class="btn  btn--main  btn--full-width" href="#">По умолчанию</a>
            </div>

            <div class="limits-cards__descr-list">
              <div class="limits-cards__descr">5 Social Profiles</div>
              <div class="limits-cards__descr">5 Scheduled Posts Per Profile</div>
              <div class="limits-cards__descr">400+ Templates</div>
              <div class="limits-cards__descr">Calendar View</div>
              <div class="limits-cards__descr">24/7 Support</div>
            </div>
          </div><!-- /.limits-cards__item -->

          <div class="limits-cards__item  limits-cards__item-main">
            <div class="limits-cards__header">
              <div class="limits-cards__value">$2500</div>
              <div class="limits-cards__descr">в день</div>
              <a class="btn  btn--main  btn--full-width" href="#">Пройти kyc</a>
            </div>

            <div class="limits-cards__descr-list">
              <div class="limits-cards__descr">5 Social Profiles</div>
              <div class="limits-cards__descr">5 Scheduled Posts Per Profile</div>
              <div class="limits-cards__descr">400+ Templates</div>
              <div class="limits-cards__descr">Calendar View</div>
              <div class="limits-cards__descr">24/7 Support</div>
            </div>
          </div><!-- /.limits-cards__item -->

        </div><!-- /.limits-cards -->

      </div><!-- /.card__body -->

    </div><!-- /.card -->

  </div><!-- /.tab-pane -->

</template>

<script>
/* eslint-disable*/
export default {
  name: "LimitsTab",
}
</script>

