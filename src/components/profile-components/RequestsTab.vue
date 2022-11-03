<template>
  <div class="tab-pane  fade  active  show" id="requests">
    <div class="x-card  x-card--full-width">
      <div class="x-card__header">
        <h1 class="x-card__title">Мои заявки</h1>
      </div>
      <div class="x-card__body">
        <div class="request">
          <div class="requests__list">
            <div class="requests__item">
              <a class="requests__item-link" href="request-details.html">
                <div class="requests__item-inner">
                  <svg class='requests__icon'>
                    <use xlink:href='#icon__coin-in'></use>
                  </svg>

                  <div class="requests__coin">
                    <svg class='requests__icon'>
                      <use xlink:href='#logo__bitcoin'></use>
                    </svg>
                    <div class="request__coin-name">Bitcoin</div>
                  </div>

                  <div class="requests__account">Счет **** **** **** **23</div>

                  <div class="requests__value-in">- 0.3444444</div>
                  <div class="requests__value-out">- 0.143 USDT</div>
                </div>
              </a>
            </div><!-- /.request__item -->

            <div class="requests__item">
              <a class="requests__item-link" href="request-details.html">
                <div class="requests__item-inner">
                  <svg class='requests__icon'>
                    <use xlink:href='#icon__coin-out'></use>
                  </svg>

                  <div class="requests__coin">
                    <svg class='requests__icon'>
                      <use xlink:href='#logo__teather'></use>
                    </svg>
                    <div class="request__coin-name">Teather</div>
                  </div>

                  <div class="requests__account">Счет **** **** **** **23</div>

                  <div class="requests__value-out">- 0.3444444</div>
                  <div class="requests__value-in">- 0.143 USDT</div>
                </div>
              </a>
            </div><!-- /.request__item -->
          </div><!-- /.request__list -->
        </div><!-- /.request -->
        <div class="pagination">

          <div class="pagination__mobile">
            Перейти к странице

            <form action="">
              <select class="pagination__selectbox  field  field--sm  field--select" name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </form>
          </div>

          <ul class="pagination__list">
            <li class="pagination__item  pagination__item--active">
              <a class="pagination__link" href="#">1</a>
            </li>
            <li class="pagination__item">
              <a class="pagination__link" href="#">2</a>
            </li>
            <li class="pagination__item">
              <a class="pagination__link" href="#">3</a>
            </li>
            <li class="pagination__item">
              <a class="pagination__link" href="#">4</a>
            </li>
            <li class="pagination__item">
              <a class="pagination__link" href="#">5</a>
            </li>
            <li class="pagination__item  pagination__item--dots">...</li>
            <li class="pagination__item">
              <a class="pagination__link" href="#">10</a>
            </li>
          </ul>
        </div>
      </div><!-- /.card__body -->
    </div><!-- /.card -->
  </div><!-- /.tab-pane -->

</template>

<script>
export default {
  name: "RequestsTab"
}
</script>

