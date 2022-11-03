<template>
  <div v-if="loading" style="align-items: center; left: 55%; top: 45%; justify-content: center; position: absolute;">
    <div style="z-index: 9;">
      <swapping-squares-spinner
          :animation-duration="1500"
          :size="150"
          color="#0047ab"
      />
    </div>
  </div>
  <div v-if="!loading">
    <div class="order-page k-grid__body--padding-y" v-if="orderTypeGlobal === 1">
      <div class="container">
        <div class="row">
          <div class="col-xl-8  mb-5  mb-xl-0">

            <div class="x-card">

              <div class="x-card__header  x-card__header--row">
                <h1 class="x-card__title">{{ orderDetails.typeOrder === 'Buy' ? 'Купить' : 'Продать'}} {{ orderDetails.cryptoValuteType }}</h1>

                <div class="x-card__header-meta">
                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Дата создания:</span> {{ orderDetails.createDateTime }}
                  </div>

                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Номер заявки:</span> {{ orderDetails.userOrderP2PId }}
                  </div>

                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Продавец:</span> {{ orderDetails.orderInfoP2PLastName }} {{ orderDetails.orderInfoP2PFirstName }}
                  </div>
                </div>
              </div>

              <div class="x-card__body">

                <div class="order-page__main-data  data-group-row">
                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Сумма</div>
                    <div class="order-page__main-val  data-group__val  data-group__val--accent">{{ orderDetails.amountCash }} {{ orderDetails.cashValuteType }}</div>
                  </div>

                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Цена</div>
                    <div class="order-page__main-val  data-group__val">{{ orderDetails.rate }} {{ orderDetails.cashValuteType }}</div>
                  </div>

                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Количество</div>
                    <div class="order-page__main-val  data-group__val">{{ orderDetails.amountCrypto }} {{ orderDetails.cryptoValuteType }}</div>
                  </div>
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Pending'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg">
                      Пожалуйста, подтвердите, что вы успешно перевели деньги продавцу с помощью указанного способа оплаты
                    </p>

                    <div class="order-page__warn">
                      Ниже приведена платежная информация продавца. Пожалуйста, убедитесь, что деньги переведены с вашего счета, соответствующего вашему подтвержденному имени. Деньги НЕ будут переведены автоматически платформой.
                    </div>

                    <div class="order-page__info" v-if="orderDetails.paymentMethodId !== null && orderDetails.paymentMethodId !== ''">
                      <h3 class="order-page__subtitle">{{ orderDetails.bankName }}</h3>

                      <div class="data-group">
                        <div class="data-group__label">Имя Фамилия</div>
                        <div class="data-group__val  d-flex  align-items-center" style="text-transform: uppercase">
                          <div ref="cardHolder">{{ orderDetails.cardHolderName }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyCardHolderName">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="data-group">
                        <div class="data-group__label">Номер карты (номер счета)</div>
                        <div class="data-group__val  d-flex  align-items-center">
                          <div ref="card">{{ orderDetails.cardNumber }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyCardNumber">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="data-group" v-if="orderDetails.walletAddress !== null && orderDetails.walletAddress !== ''">
                        <div class="data-group__label">Номер счета</div>
                        <div class="data-group__val  d-flex  align-items-center">
                          <div ref="walletAddress">{{ orderDetails.walletAdress }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyWalletAddress">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div><!-- /.order-page__info -->
                    <div v-else>
                      <div class="order-page__info" v-for="item in paymentMethods" :key="item.id">
                        <hr>
                        <h3 class="order-page__subtitle">{{ item.paymentMethod.bankName }}</h3>

                        <div class="data-group">
                          <div class="data-group__label">Имя Фамилия</div>
                          <div class="data-group__val  d-flex  align-items-center" style="text-transform: uppercase">
                            <div ref="cardHolder">{{ item.paymentMethod.cardHolderName }}</div>
                            <button class="data-group__copy  copy-btn" @click="copyCardHolderName">
                              <svg class='copy-btn__icon  icon  icon--sm'>
                                <use xlink:href='#icon__files'></use>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div class="data-group">
                          <div class="data-group__label">Номер карты (номер счета)</div>
                          <div class="data-group__val  d-flex  align-items-center">
                            <div ref="card">{{ item.paymentMethod.cardNumber }}</div>
                            <button class="data-group__copy  copy-btn" @click="copyCardNumber">
                              <svg class='copy-btn__icon  icon  icon--sm'>
                                <use xlink:href='#icon__files'></use>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div class="data-group" v-if="item.paymentMethod.walletAdress !== null && item.paymentMethod.walletAdress !== ''">
                          <div class="data-group__label">Номер счета</div>
                          <div class="data-group__val  d-flex  align-items-center">
                            <div ref="walletAddress">{{ item.paymentMethod.walletAdress }}</div>
                            <button class="data-group__copy  copy-btn" @click="copyWalletAddress">
                              <svg class='copy-btn__icon  icon  icon--sm'>
                                <use xlink:href='#icon__files'></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div><!-- /.order-page__info -->
                    </div>

                  </div><!-- /.order-page__confirm -->

                  <div class="order-page__footer">

<!--                    <div class="order-page__counter">-->
<!--                      Время на отправку денежных средств <span style="color: #f4a406">00:14:23</span>-->
<!--                    </div>-->

                    <p class="text  text-muted  mb-4">Пожалуйста отправьте средства в течении 15:00 минут, иначе, сделка будет отменена</p>

                    <div class="order-page__action-btns">
                      <button class="btn  btn--main" @click="handleBuyerConfirm">Средства отправлены</button>
                      <button class="btn  btn--transparent" @click="handleCancel">Отменить сделку</button>
                    </div>
                  </div>
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'BuyerConfirmed' || orderDetails.p2POperationStatus === 'SellerConfirmed'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-warning">
                      Вы подтвердили оплату заказа. Пожалуйста ожидайте подтверждения продавца!
                    </p>

                    <div class="order-page__warn">
                      Средства поступят на ваш кошелек сразу же после того как продавец подтвердит поступление оплаты.
                    </div>
                  </div><!-- /.order-page__confirm -->
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Canceled'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-danger">
                      Заказ был отменен!
                    </p>
                  </div><!-- /.order-page__confirm -->
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Completed'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-success">
                      Заказ был успешно выполнен!
                    </p>
                  </div><!-- /.order-page__confirm -->
                </div>

              </div><!-- /.x-card__body -->

            </div><!-- /.x-card -->

          </div><!-- /.col-8 -->

          <div class="col-xl-4">

            <h2 class="mb-3">Внимание!</h2>

            <p class="text  text-muted">
              В случае возникновения спорного вопроса, обратитесь в службу технической поддержки.
            </p>

          </div>

        </div><!-- /.row -->

      </div><!-- /.container -->

    </div><!-- /.order-page -->

    <div class="order-page k-grid__body--padding-y" v-if="orderTypeGlobal === 2">
      <div class="container">
        <div class="row">
          <div class="col-xl-8  mb-5  mb-xl-0">

            <div class="x-card">

              <div class="x-card__header  x-card__header--row">
                <h1 class="x-card__title">{{ orderDetails.typeOrder === 'Buy' ? 'Продать' : 'Купить'}} {{ orderDetails.cryptoValuteType }}</h1>

                <div class="x-card__header-meta">
                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Дата создания:</span> {{ orderDetails.createDateTime }}
                  </div>

                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Номер заявки:</span> {{ orderDetails.userOrderP2PId }}
                  </div>

                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Продавец:</span> {{ orderDetails.orderInfoP2PLastName }} {{ orderDetails.orderInfoP2PFirstName }}
                  </div>
                </div>
              </div>

              <div class="x-card__body">

                <div class="order-page__main-data  data-group-row">
                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Сумма</div>
                    <div class="order-page__main-val  data-group__val  data-group__val--accent">{{ orderDetails.amountCash }} {{ orderDetails.cashValuteType }}</div>
                  </div>

                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Цена</div>
                    <div class="order-page__main-val  data-group__val">{{ orderDetails.rate }} {{ orderDetails.cashValuteType }}</div>
                  </div>

                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Количество</div>
                    <div class="order-page__main-val  data-group__val">{{ orderDetails.amountCrypto }} {{ orderDetails.cryptoValuteType }}</div>
                  </div>
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Pending'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-warning">
                      Покупатель ещё  не произвел оплату. Пожалуйста ожидайте подтверждения покупателя!
                    </p>

                    <div class="order-page__warn">
                      Средства поступят по указанным вами реквизитам.
                    </div>

                    <div class="order-page__info" v-if="orderDetails.paymentMethodId !== null && orderDetails.paymentMethodId !== ''">
                      <h3 class="order-page__subtitle">{{ orderDetails.bankName }}</h3>

                      <div class="data-group">
                        <div class="data-group__label">Имя Фамилия</div>
                        <div class="data-group__val  d-flex  align-items-center" style="text-transform: uppercase">
                          <div ref="cardHolder">{{ orderDetails.cardHolderName }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyCardHolderName">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="data-group">
                        <div class="data-group__label">Номер карты (номер счета)</div>
                        <div class="data-group__val  d-flex  align-items-center">
                          <div ref="card">{{ orderDetails.cardNumber }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyCardNumber">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="data-group" v-if="orderDetails.walletAddress !== null && orderDetails.walletAddress !== ''">
                        <div class="data-group__label">Номер счета</div>
                        <div class="data-group__val  d-flex  align-items-center">
                          <div ref="walletAddress">{{ orderDetails.walletAdress }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyWalletAddress">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div><!-- /.order-page__info -->
                    <div v-else>
                      <div class="order-page__info" v-for="item in paymentMethods" :key="item.id">
                        <hr>
                        <h3 class="order-page__subtitle">{{ item.paymentMethod.bankName }}</h3>

                        <div class="data-group">
                          <div class="data-group__label">Имя Фамилия</div>
                          <div class="data-group__val  d-flex  align-items-center" style="text-transform: uppercase">
                            <div ref="cardHolder">{{ item.paymentMethod.cardHolderName }}</div>
                            <button class="data-group__copy  copy-btn" @click="copyCardHolderName">
                              <svg class='copy-btn__icon  icon  icon--sm'>
                                <use xlink:href='#icon__files'></use>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div class="data-group">
                          <div class="data-group__label">Номер карты (номер счета)</div>
                          <div class="data-group__val  d-flex  align-items-center">
                            <div ref="card">{{ item.paymentMethod.cardNumber }}</div>
                            <button class="data-group__copy  copy-btn" @click="copyCardNumber">
                              <svg class='copy-btn__icon  icon  icon--sm'>
                                <use xlink:href='#icon__files'></use>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div class="data-group" v-if="item.paymentMethod.walletAdress !== null && item.paymentMethod.walletAdress !== ''">
                          <div class="data-group__label">Номер счета</div>
                          <div class="data-group__val  d-flex  align-items-center">
                            <div ref="walletAddress">{{ item.paymentMethod.walletAdress }}</div>
                            <button class="data-group__copy  copy-btn" @click="copyWalletAddress">
                              <svg class='copy-btn__icon  icon  icon--sm'>
                                <use xlink:href='#icon__files'></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div><!-- /.order-page__info -->
                    </div>


                  </div><!-- /.order-page__confirm -->
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'BuyerConfirmed'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-success">
                      Покупатель отправил средства по вашим реквизитам!
                    </p>

                    <div class="order-page__warn">
                      Пожалуста проверьте ваш счет и при поступлении средств подтвердите получение.
                    </div>
                  </div><!-- /.order-page__confirm -->

                  <div class="order-page__footer">

<!--                    <div class="order-page__counter">-->
<!--                      Payment to be made <span style="color: #f4a406">00:14:23</span>-->
<!--                    </div>-->

<!--                    <p class="text  text-muted  mb-4">Please make a payment within 15:00 minutes, otherwise, the order will be canseled</p>-->

                    <div class="order-page__action-btns">
                      <button class="btn  btn--success" @click="handleSellerConfirm">Средства получены</button>
                    </div>
                  </div>
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Canceled'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-danger">
                      Заказ был отменен!
                    </p>
                  </div><!-- /.order-page__confirm -->
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Completed'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-success">
                      Заказ был успешно выполнен!
                    </p>
                  </div><!-- /.order-page__confirm -->
                </div>

              </div><!-- /.x-card__body -->

            </div><!-- /.x-card -->

          </div><!-- /.col-8 -->

          <div class="col-xl-4">

            <h2 class="mb-3">Внимание!</h2>

            <p class="text  text-muted">
              В случае возникновения спорного вопроса, обратитесь в службу технической поддержки.
            </p>

          </div>

        </div><!-- /.row -->

      </div><!-- /.container -->

    </div><!-- /.order-page -->

    <div class="order-page k-grid__body--padding-y" v-if="orderTypeGlobal === 3">
      <div class="container">
        <div class="row">
          <div class="col-xl-8  mb-5  mb-xl-0">

            <div class="x-card">

              <div class="x-card__header  x-card__header--row">
                <h1 class="x-card__title">{{ orderDetails.typeOrder === 'Buy' ? 'Купить' : 'Продать'}} {{ orderDetails.cryptoValuteType }}</h1>

                <div class="x-card__header-meta">
                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Дата создания:</span> {{ orderDetails.createDateTime }}
                  </div>

                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Номер заказа:</span> {{ orderDetails.userOrderP2PId }}
                  </div>

                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Продавец:</span> {{ orderDetails.orderInfoP2PLastName }} {{ orderDetails.orderInfoP2PFirstName }}
                  </div>
                </div>
              </div>

              <div class="x-card__body">

                <div class="order-page__main-data  data-group-row">
                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Сумма</div>
                    <div class="order-page__main-val  data-group__val  data-group__val--accent">{{ orderDetails.amountCash }} {{ orderDetails.cashValuteType }}</div>
                  </div>

                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Цена</div>
                    <div class="order-page__main-val  data-group__val">{{ orderDetails.rate }} {{ orderDetails.cashValuteType }}</div>
                  </div>

                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Количество</div>
                    <div class="order-page__main-val  data-group__val">{{ orderDetails.amountCrypto }} {{ orderDetails.cryptoValuteType }}</div>
                  </div>
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Pending'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-warning">
                      Покупатель ещё  не произвел оплату. Пожалуйста ожидайте подтверждения покупателя!
                    </p>

                    <div class="order-page__warn">
                      Средства поступят по указанным вами реквизитам.
                    </div>

                    <div class="order-page__info">
                      <h3 class="order-page__subtitle">{{ orderDetails.bankName }}</h3>

                      <div class="data-group">
                        <div class="data-group__label">Имя Фамилия</div>
                        <div class="data-group__val  d-flex  align-items-center" style="text-transform: uppercase">
                          <div ref="cardHolder">{{ orderDetails.cardHolderName }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyCardHolderName">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="data-group">
                        <div class="data-group__label">Номер карты (номер счета)</div>
                        <div class="data-group__val  d-flex  align-items-center">
                          <div ref="card">{{ orderDetails.cardNumber }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyCardNumber">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="data-group" v-if="orderDetails.walletAddress !== null && orderDetails.walletAddress !== ''">
                        <div class="data-group__label">Номер счета</div>
                        <div class="data-group__val  d-flex  align-items-center">
                          <div ref="walletAddress">{{ orderDetails.walletAdress }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyWalletAddress">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div><!-- /.order-page__info -->

                  </div><!-- /.order-page__confirm -->
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'BuyerConfirmed'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-success">
                      Покупатель отправил средства по вашим реквизитам!
                    </p>

                    <div class="order-page__warn">
                      Пожалуста проверьте ваш счет и при поступлении средств подтвердите получение.
                    </div>
                  </div><!-- /.order-page__confirm -->

                  <div class="order-page__footer">

                    <!--                    <div class="order-page__counter">-->
                    <!--                      Payment to be made <span style="color: #f4a406">00:14:23</span>-->
                    <!--                    </div>-->

                    <!--                    <p class="text  text-muted  mb-4">Please make a payment within 15:00 minutes, otherwise, the order will be canseled</p>-->

                    <div class="order-page__action-btns">
                      <button class="btn  btn--success" @click="handleSellerConfirm">Средства получены</button>
                    </div>
                  </div>
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Canceled'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-danger">
                      Заказ был отменен!
                    </p>
                  </div><!-- /.order-page__confirm -->
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Completed'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-success">
                      Заказ был успешно выполнен!
                    </p>
                  </div><!-- /.order-page__confirm -->
                </div>

              </div><!-- /.x-card__body -->

            </div><!-- /.x-card -->

          </div><!-- /.col-8 -->

          <div class="col-xl-4">

            <h2 class="mb-3">Внимание!</h2>

            <p class="text  text-muted">
              В случае возникновения спорного вопроса, обратитесь в службу технической поддержки.
            </p>

          </div>

        </div><!-- /.row -->

      </div><!-- /.container -->

    </div><!-- /.order-page -->

    <div class="order-page k-grid__body--padding-y" v-if="orderTypeGlobal === 4">
      <div class="container">
        <div class="row">
          <div class="col-xl-8  mb-5  mb-xl-0">

            <div class="x-card">

              <div class="x-card__header  x-card__header--row">
                <h1 class="x-card__title">{{ orderDetails.typeOrder === 'Buy' ? 'Продать' : 'Купить'}} {{ orderDetails.cryptoValuteType }}</h1>

                <div class="x-card__header-meta">
                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Дата создания:</span> {{ orderDetails.createDateTime }}
                  </div>

                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Номер заказа:</span> {{ orderDetails.userOrderP2PId }}
                  </div>

                  <div class="x-card__meta-item">
                    <span class="x-card__meta-label">Продавец:</span> {{ orderDetails.orderInfoP2PLastName }} {{ orderDetails.orderInfoP2PFirstName }}
                  </div>
                </div>
              </div>

              <div class="x-card__body">

                <div class="order-page__main-data  data-group-row">
                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Сумма</div>
                    <div class="order-page__main-val  data-group__val  data-group__val--accent">{{ orderDetails.amountCash }} {{ orderDetails.cashValuteType }}</div>
                  </div>

                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Цена</div>
                    <div class="order-page__main-val  data-group__val">{{ orderDetails.rate }} {{ orderDetails.cashValuteType }}</div>
                  </div>

                  <div class="data-group-row__item  data-group">
                    <div class="data-group__label">Количество</div>
                    <div class="order-page__main-val  data-group__val">{{ orderDetails.amountCrypto }} {{ orderDetails.cryptoValuteType }}</div>
                  </div>
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Pending'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg">
                      Пожалуйста, подтвердите, что вы успешно перевели деньги продавцу с помощью указанного способа оплаты
                    </p>

                    <div class="order-page__warn">
                      Ниже приведена платежная информация продавца. Пожалуйста, убедитесь, что деньги переведены с вашего счета, соответствующего вашему подтвержденному имени. Деньги НЕ будут переведены автоматически платформой.
                    </div>

                    <div class="order-page__info">
                      <h3 class="order-page__subtitle">{{ orderDetails.bankName }}</h3>

                      <div class="data-group">
                        <div class="data-group__label">Имя Фамилия</div>
                        <div class="data-group__val  d-flex  align-items-center" style="text-transform: uppercase">
                          <div ref="cardHolder">{{ orderDetails.cardHolderName }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyCardHolderName">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="data-group">
                        <div class="data-group__label">Номер карты (номер счета)</div>
                        <div class="data-group__val  d-flex  align-items-center">
                          <div ref="card">{{ orderDetails.cardNumber }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyCardNumber">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="data-group" v-if="orderDetails.walletAddress !== null && orderDetails.walletAddress !== ''">
                        <div class="data-group__label">Номер счета</div>
                        <div class="data-group__val  d-flex  align-items-center">
                          <div ref="walletAddress">{{ orderDetails.walletAdress }}</div>
                          <button class="data-group__copy  copy-btn" @click="copyWalletAddress">
                            <svg class='copy-btn__icon  icon  icon--sm'>
                              <use xlink:href='#icon__files'></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div><!-- /.order-page__info -->

                  </div><!-- /.order-page__confirm -->

                  <div class="order-page__footer">

<!--                    <div class="order-page__counter">-->
<!--                      Payment to be made <span style="color: #f4a406">00:14:23</span>-->
<!--                    </div>-->

                    <p class="text  text-muted  mb-4">Пожалуйста отправьте средства в течении 15:00 минут, иначе, сделка будет отменена</p>

                    <div class="order-page__action-btns">
                      <button class="btn  btn--main" @click="handleBuyerConfirm">Средства переведены</button>
                      <button class="btn  btn--transparent" @click="handleCancel">Отменить сделку</button>
                    </div>
                  </div>
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'BuyerConfirmed'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-warning">
                      Вы подтвердили оплату заказа. Пожалуйста ожидайте подтверждения продавца!
                    </p>

                    <div class="order-page__warn">
                      Средства поступят на ваш кошелек сразу же после того как продавец подтвердит поступление оплаты.
                    </div>
                  </div><!-- /.order-page__confirm -->
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Canceled'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-danger">
                      Заказ был отменен!
                    </p>
                  </div><!-- /.order-page__confirm -->
                </div>

                <div v-if="orderDetails.p2POperationStatus === 'Completed'">
                  <div class="order-page__confirm">
                    <p class="order-page__main-msg text-center text-success">
                      Заказ был успешно выполнен!
                    </p>
                  </div><!-- /.order-page__confirm -->
                </div>

              </div><!-- /.x-card__body -->

            </div><!-- /.x-card -->

          </div><!-- /.col-8 -->

          <div class="col-xl-4">

            <h2 class="mb-3">Внимание!</h2>

            <p class="text  text-muted">
              В случае возникновения спорного вопроса, обратитесь в службу технической поддержки.
            </p>

          </div>

        </div><!-- /.row -->

      </div><!-- /.container -->

    </div><!-- /.order-page -->
  </div>
</template>

<script>
/* eslint-disable*/
import { createToast } from 'mosha-vue-toastify';
import { SwappingSquaresSpinner  } from 'epic-spinners'
import 'mosha-vue-toastify/dist/style.css'
import UserService from "@/services/user.service";
import P2PService from "@/services/p2p.service";
import moment from "moment/moment";

export default {
  name: "OrderConfirmation",
  components: {
    SwappingSquaresSpinner
  },
  data(){
    return {
      loading: false,
      /**
       * orderTypeGlobal - пояснения для поля
       *
       * 1 - Тип ордера "Buy" и
       * currentUser.UserId == orderDetails.userId (Покупатель, создатель ордера)
       *
       * 2 - Тип ордера "Buy" и
       * currentUser.UserId != orderDetails.userId (Продавец, создатель объявления)
       *
       * 3 - Тип ордера "Sell" и
       * currentUser.UserId == orderDetails.userId (Продавец, создатель ордера)
       *
       * 4 - Тип ордера "Sell" и
       * currentUser.UserId != orderDetails.userId (Покупатель, создатель объявления)
       * **/
      orderTypeGlobal: null,
      orderDetails: {
        userOrderP2PId: "",
        cashValuteType: "",
        typeOrder: "",
        cryptoValuteType: "",
        p2POperationStatus: "",
        amountCash: 0,
        amountCrypto: 0,
        rate: 0,
        userId: "",
        orderInfoP2PId: "",
        paymentMethodId: "",
        bankName: "",
        cardNumber: "",
        cardHolderName: "",
        createDateTime: null,
        orderInfoP2PLastName: "",
        orderInfoP2PFirstName: "",
        orderInfoP2PTimeLimit: "",
      },
      paymentMethods: [],
      createdTime: "",
      now: "",
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods:{
    copyWalletAddress(){
      let el = this.$refs.walletAddress;
      navigator.clipboard.writeText(el.innerHTML);
      createToast(el.innerHTML + " - successfully copied!", {
        type: 'success',
        position: 'top-right',
        showIcon: true,
      });
    },
    copyCardNumber(){
      let el = this.$refs.card;
      navigator.clipboard.writeText(el.innerHTML);
      createToast(el.innerHTML + " - successfully copied!", {
        type: 'success',
        position: 'top-right',
        showIcon: true,
      });
    },
    copyCardHolderName(){
      let el = this.$refs.cardHolder;
      navigator.clipboard.writeText(el.innerHTML);
      createToast(el.innerHTML + " - successfully copied!", {
        type: 'success',
        position: 'top-right',
        showIcon: true,
      });
    },
    handleBuyerConfirm(){
      this.loading = true;
      P2PService.setStatusBuyerConfirmed(this.orderDetails.userOrderP2PId).then(
          (response) => {
            createToast("Успешно подтверждено!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.loadOrderInfo();
          },
          (error) => {
            createToast({
              title: 'Произошла ошибка',
              description: error.response.data,
            }, {
              type: 'danger',
              position: 'top-right',
              showIcon: true,
            })
            this.loading = true;
          }
      );
    },
    handleSellerConfirm(){
      this.loading = true;
      P2PService.setStatusSellerConfirmed(this.orderDetails.userOrderP2PId).then(
          (response) => {
            createToast("Успешно подтверждено!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.loadOrderInfo();
          },
          (error) => {
            createToast({
              title: 'Произошла ошибка',
              description: error.response.data,
            }, {
              type: 'danger',
              position: 'top-right',
              showIcon: true,
            })
            this.loading = true;
          }
      );
    },
    handleCancel(){
      this.loading = true;
      P2PService.setStatusCanceled(this.orderDetails.userOrderP2PId).then(
          (response) => {
            createToast("Успешно отменено!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.loadOrderInfo();
          },
          (error) => {
            createToast({
              title: 'Произошла ошибка',
              description: error.response.data,
            }, {
              type: 'danger',
              position: 'top-right',
              showIcon: true,
            })
            this.loading = false;
          }
      );
    },
    setOrderTypeGlobal(){
      if(this.orderDetails.typeOrder === "Buy" && this.orderDetails.userId === this.currentUser.userId){
        this.orderTypeGlobal = 1;
      }
      if(this.orderDetails.typeOrder === "Buy" && this.orderDetails.userId !== this.currentUser.userId){
        this.orderTypeGlobal = 2;
      }
      if(this.orderDetails.typeOrder === "Sell" && this.orderDetails.userId === this.currentUser.userId){
        this.orderTypeGlobal = 3;
      }
      if(this.orderDetails.typeOrder === "Sell" && this.orderDetails.userId !== this.currentUser.userId){
        this.orderTypeGlobal = 4;
      }
    },
    getPaymentMethodsForOrder(orderId){
      this.loading = true;
      this.paymentMethods = [];
      P2PService.getOrderPaymentMethods(orderId).then(
          (response) => {
            this.paymentMethods = response.data;
            this.loading = false;
          },
          (error) => {
            console.log(error);
            this.loading = false;
          }
      );
    },
    loadOrderInfo(){
      if (this.$route.params.id) {
        this.loading = true
        P2PService.getOrderDetailsForCustomer(this.$route.params.id).then(
            (response) => {
              this.orderDetails.userOrderP2PId = response.data.userOrderP2PId;
              this.orderDetails.cashValuteType = response.data.cashValuteType;
              this.orderDetails.typeOrder = response.data.typeOrder;
              this.orderDetails.cryptoValuteType = response.data.cryptoValuteType;
              this.orderDetails.p2POperationStatus = response.data.p2POperationStatus;
              this.orderDetails.amountCash = response.data.amountCash;
              this.orderDetails.amountCrypto = response.data.amountCrypto;
              this.orderDetails.rate = response.data.rate;
              this.orderDetails.userId = response.data.userId;
              this.orderDetails.orderInfoP2PId = response.data.orderInfoP2PId;
              this.orderDetails.paymentMethodId = response.data.paymentMethodId;
              this.orderDetails.bankName = response.data.bankName;
              this.orderDetails.cardNumber = response.data.cardNumber;
              this.orderDetails.cardHolderName = response.data.cardHolderName;
              this.orderDetails.orderInfoP2PLastName = response.data.orderInfoP2PLastName,
              this.orderDetails.orderInfoP2PFirstName = response.data.orderInfoP2PFirstName,
              this.orderDetails.orderInfoP2PTimeLimit = response.data.orderInfoP2PTimeLimit,
              this.orderDetails.createDateTime = moment(response.data.createDateTime).format('DD.MM.YYYY, HH:mm:ss');
              this.createdTime = moment(response.data.createDateTime).format('HH:mm:ss');

              // let curr = moment().toISOString();
              // this.now = moment(curr).format('HH:mm:ss')
              this.setOrderTypeGlobal();
              //
              // let n = moment(curr).format('HH:mm:ss');
              // let cr = moment(response.data.createDateTime).format('HH:mm:ss');
              //
              // let minutesDiff = moment.utc(moment(n,"HH:mm:ss").diff(moment(cr,"HH:mm:ss"))).format("HH:mm:ss")
              //
              //
              // console.log(minutesDiff);

              if(this.orderDetails.paymentMethodId === null || this.orderDetails.paymentMethodId === ""){
                this.getPaymentMethodsForOrder(this.orderDetails.orderInfoP2PId);
              }

              this.loading = false;
            },
            (error) => {
              this.content =
                  (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString();
              this.loading = false;
            }
        );
      }
    }
  },
  mounted() {
    this.loadOrderInfo()
  }
}
</script>

<style scoped>

</style>
