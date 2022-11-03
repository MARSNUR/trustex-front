<template>
  <div class="tab-pane fade active show" id="balance">

    <div class="x-card  x-card--full-width">

      <div class="x-card__header">
        <h1 class="x-card__title">Баланс</h1>
      </div>

      <div class="x-card__body">
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
          <div class="row" v-if="loadedUser !== undefined && loadedUser.walletAddress !== null && loadedUser.walletAddress !== ''">
            <div class="col-12 mb-3">
              <div class="order-page__confirm">
                <div class="data-group">
                  <div class="data-group__label">Баланс кошелька</div>
                  <div class="order-page__main-val data-group__val text-primary">{{ loadedUser.balance }} USDT</div>
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <router-link class="btn btn--main" to="/withdraw">Вывод</router-link>
              <router-link class="btn btn--main" to="/withdraw-list">История транзакций</router-link>
            </div>
            <div class="col-12">
              <div class="data-group">
                <div class="data-group__label">Адрес кошелька</div>
                <div class="data-group__val  d-flex  align-items-center pt-2">
                  <div class="order-page__main-val data-group__val wAddress" ref="waddress">{{ loadedUser.walletAddress }}</div>
                  <button class="data-group__copy  copy-btn" @click="copyWalletAddress">
                    <svg class='copy-btn__icon  icon  icon--sm'>
                      <use xlink:href='#icon__files'></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex justify-content-start">
                <QRCodeVue3
                    :width="250"
                    :height="250"
                    :value="loadedUser.walletAddress"
                    :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                    :imageOptions="{ hideBackgroundDots: true, imageSize: 0.7, margin: 4 }"
                    :dotsOptions="{ type: 'classy', color: '#000000', gradient: null}"
                    image="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDY1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDkuNTUgNS42NjhMMjMuMTU3IDMyLjA2MmwyNi4zOTUgMjYuMzk1IDI2LjM5NC0yNi4zOTVMNDkuNTUxIDUuNjY4ek0xNy40ODkgMzIuMDYybDMyLjA2MyAzMi4wNjMgMzIuMDYyLTMyLjA2M0w0OS41NSAwIDE3LjQ4OSAzMi4wNjJ6IiBmaWxsPSIjMDA0N2FiIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMi4wOTggMTUuNjMybC0xNi40MyAxNi40MyAxNi40MyAxNi40MyAxNi40My0xNi40My0xNi40My0xNi40M3pNMCAzMi4wNjJMMjIuMDk4IDU0LjE2bDIyLjA5OC0yMi4wOThMMjIuMDk4IDkuOTY0IDAgMzIuMDYyem04MS42MTMtMTYuNDNsLTE2LjQzIDE2LjQzIDE2LjQzIDE2LjQzIDE2LjQzLTE2LjQzLTE2LjQzLTE2LjQzem0tMjIuMDk4IDE2LjQzTDgxLjYxMyA1NC4xNmwyMi4wOTgtMjIuMDk4TDgxLjYxMyA5Ljk2NCA1OS41MTUgMzIuMDYyeiIgZmlsbD0iIzAwNDdhYiIvPjxwYXRoIGQ9Ik0xMjUuNjkzIDIzLjQ4NmgtNS43MTl2MTQuODM4aC0zLjQ1MVYyMy40ODZoLTUuNzE4di0zLjA0OGgxNC44ODh2My4wNDh6IiBmaWxsPSIjMDA0N2FiIi8+PHBhdGggZD0iTTEzMi42NjUgMjguMDQ2Yy0xLjAyNC4wMTctMS45MzkuMjE4LTIuNzQ1LjYwNC0uODA2LjM3LTEuMzg2LjkzMi0xLjczOSAxLjY4OHY3Ljk4NmgtMy4zNzV2LTEzLjJoMy4wOTh2Mi44MmMuMjM1LS40NTMuNTEzLS44NTYuODMyLTEuMjA4YTYuMTQgNi4xNCAwIDAxMS4wMzItLjk1OGMuMzctLjI2OC43MzktLjQ3IDEuMTA5LS42MDRhMy4wNCAzLjA0IDAgMDExLjEwOC0uMjI3aC40MDNjLjEwMSAwIC4xOTQuMDA5LjI3Ny4wMjV2My4wNzR6bTUuOTEzIDEwLjUzYy0xLjM2IDAtMi4zOTMtLjQzNy0zLjA5OC0xLjMxLS43MDYtLjg3NC0xLjA1OC0yLjE2Ny0xLjA1OC0zLjg4di04LjI2M2gzLjM3NXY3LjUzM2MwIDIuMDMyLjczMSAzLjA0OCAyLjE5MiAzLjA0OC42NTUgMCAxLjI4NS0uMTkzIDEuODg5LS41OC42MjItLjQwMyAxLjEyNi0xLjAwNyAxLjUxMi0xLjgxM3YtOC4xODhoMy4zNzZ2OS4zMjFjMCAuMzUzLjA1OC42MDUuMTc2Ljc1Ni4xMzQuMTUxLjM0NC4yMzUuNjMuMjUydjIuODcyYTcuMDU2IDcuMDU2IDAgMDEtMS40NjEuMTVjLS42MDUgMC0xLjEtLjEzMy0xLjQ4Ny0uNDAyLS4zNjktLjI4Ni0uNTg3LS42NzItLjY1NS0xLjE1OWwtLjA3NS0xLjA1OGMtLjU4OC45MDctMS4zNDQgMS41ODctMi4yNjcgMi4wNC0uOTI0LjQ1NC0xLjk0LjY4LTMuMDQ5LjY4em0xNi41MyAwYy0xLjEwOCAwLTIuMTkyLS4xNzctMy4yNS0uNTMtMS4wNTgtLjM1Mi0xLjk2NS0uODU2LTIuNzItMS41MWwxLjI1OS0yLjExN2MuODA2LjU3MSAxLjU4NyAxLjAwOCAyLjM0MyAxLjMxYTYuNTgzIDYuNTgzIDAgMDAyLjI5Mi40MjhjLjY3MiAwIDEuMjAxLS4xMjYgMS41ODgtLjM3OC4zODYtLjI1Mi41NzktLjYxMy41NzktMS4wODNzLS4yMjctLjgxNC0uNjgtMS4wMzNjLS40NTQtLjIxOC0xLjE5My0uNDctMi4yMTctLjc1NWEyOS43MTMgMjkuNzEzIDAgMDEtMi4xOTItLjY4Yy0uNjA0LS4yMTktMS4wOTEtLjQ2Mi0xLjQ2MS0uNzMxLS4zNjktLjI4Ni0uNjM4LS42MDUtLjgwNi0uOTU3LS4xNjgtLjM3LS4yNTItLjgwNi0uMjUyLTEuMzEgMC0uNjcyLjEyNi0xLjI3Ny4zNzgtMS44MTRhMy45NTYgMy45NTYgMCAwMTEuMTA4LTEuMzYgNC45NyA0Ljk3IDAgMDExLjYzOC0uODgyIDYuODI3IDYuODI3IDAgMDEyLjA2Ni0uMzAyYy45OSAwIDEuOTE0LjE0MiAyLjc3MS40MjhhNi43NjIgNi43NjIgMCAwMTIuMzkzIDEuMzg1bC0xLjM2MSAyLjA0Yy0uNjcxLS41MDMtMS4zMjYtLjg3My0xLjk2NC0xLjEwOGE1LjI0IDUuMjQgMCAwMC0xLjg2NS0uMzUyYy0uNTcxIDAtMS4wNDkuMTE3LTEuNDM2LjM1Mi0uMzg2LjIzNS0uNTc5LjYxMy0uNTc5IDEuMTM0IDAgLjIzNS4wNDIuNDI4LjEyNi41OC4xMDEuMTUuMjUyLjI4NS40NTMuNDAyLjIwMi4xMTguNDYyLjIzNi43ODEuMzUzLjMzNi4xLjc0OC4yMSAxLjIzNS4zMjguOTA3LjIzNSAxLjY3OS40NyAyLjMxNy43MDUuNjU1LjIzNSAxLjE4NC41MDQgMS41ODcuODA2LjQyLjMwMi43MjMuNjU1LjkwNyAxLjA1OC4yMDIuMzg2LjMwMy44NTcuMzAzIDEuNDEgMCAxLjI5NC0uNDc5IDIuMzE5LTEuNDM2IDMuMDc0LS45NTguNzQtMi4yNTkgMS4xMDktMy45MDUgMS4xMDl6bTE1LjQ0NC0uOTMyYTE1LjExIDE1LjExIDAgMDEtMS42NjIuNjA0IDYuOTg5IDYuOTg5IDAgMDEtMi4wNjYuMzAzIDQuOTMgNC45MyAwIDAxLTEuMzM1LS4xNzcgMy4xNjcgMy4xNjcgMCAwMS0xLjA4NC0uNTU0IDMuMDA1IDMuMDA1IDAgMDEtLjczLTEuMDA4Yy0uMTg1LS40Mi0uMjc3LS45MjMtLjI3Ny0xLjUxMXYtNy41ODNoLTEuNzM4di0yLjU5NWgxLjczOHYtNC4yODJoMy4zNzV2NC4yODJoMi43NzF2Mi41OTVoLTIuNzcxdjYuNDVjMCAuNDcuMTE4LjgwNS4zNTMgMS4wMDcuMjUyLjE4NS41NTQuMjc3LjkwNy4yNzdzLjY5Ny0uMDU5IDEuMDMzLS4xNzZjLjMzNi0uMTE4LjYwNC0uMjE5LjgwNi0uMzAzbC42OCAyLjY3em0xNC41MDUtMi4zNjh2My4wNDhoLTEyLjQxOVYyMC40MzhoMTIuMTkydjMuMDQ4aC04LjcxNnY0LjMwOGg3LjUzMnYyLjgyMWgtNy41MzJ2NC42Nmg4Ljk0M3ptNC40NzQtMTAuMTUzbDIuODQ2IDQuMTMyLjIwMi40NTMuMjUyLS40NTMgMi44MjEtNC4xMzFoMy40NzdsLTQuNzExIDYuNjI1IDQuNzg2IDYuNTc1aC0zLjQ3NmwtMi45MjItNC4xMDYtLjIyNy0uNDI5LS4yMDIuNDI5LTIuODk3IDQuMTA2aC0zLjQ3Nmw0Ljc2MS02LjU3NS00LjY4Ni02LjYyNWgzLjQ1MnptLTQwLjQzNSAxOC4zMzloLjUxOWwxLjA0IDEuNzVoLjA0NGwxLjAzOS0xLjc1aC41MmwtMS4zNTQgMi4yMDN2MS41NDRoLS40NTR2LTEuNTQ0bC0xLjM1NC0yLjIwM3ptNC40MzQgMy44MDZjLS4yNTMgMC0uNDc2LS4wNi0uNjY4LS4xODFhMS4yMyAxLjIzIDAgMDEtLjQ0Ni0uNTA3IDEuNzE2IDEuNzE2IDAgMDEtLjE1OS0uNzYxYzAtLjI5My4wNTMtLjU0OS4xNTktLjc2Ny4xMDctLjIxOC4yNTYtLjM4OC40NDYtLjUwOWExLjIzIDEuMjMgMCAwMS42NjgtLjE4Yy4yNTQgMCAuNDc2LjA2LjY2Ni4xOC4xOTIuMTIxLjM0MS4yOS40NDcuNTA5LjEwNy4yMTguMTYxLjQ3NC4xNjEuNzY3IDAgLjI5LS4wNTQuNTQ0LS4xNjEuNzZhMS4yMSAxLjIxIDAgMDEtLjQ0Ny41MDhjLS4xOS4xMi0uNDEyLjE4LS42NjYuMTh6bTAtLjM4OGEuNzQuNzQgMCAwMC40NzYtLjE0OC44Ny44NyAwIDAwLjI3Ni0uMzljLjA2LS4xNjEuMDktLjMzNS4wOS0uNTIzcy0uMDMtLjM2My0uMDktLjUyNWEuODgxLjg4MSAwIDAwLS4yNzYtLjM5NC43MzQuNzM0IDAgMDAtLjQ3Ni0uMTUuNzMzLjczMyAwIDAwLS40NzUuMTUuODgzLjg4MyAwIDAwLS4yNzcuMzk0Yy0uMDYuMTYyLS4wODkuMzM3LS4wODkuNTI1cy4wMjkuMzYyLjA4OS41MjNjLjA2LjE2MS4xNTIuMjkxLjI3Ny4zOWEuNzQuNzQgMCAwMC40NzUuMTQ4em0zLjcwNC0uODJWNDQuNGguNDMydjIuODFoLS40MzJ2LS40NzVoLS4wMjlhLjkyMy45MjMgMCAwMS0uMzA3LjM2NC44ODguODg4IDAgMDEtLjUyNy4xNDguOTQuOTQgMCAwMS0uNDY5LS4xMTUuODEuODEgMCAwMS0uMzIyLS4zNTIgMS4zMzYgMS4zMzYgMCAwMS0uMTE3LS41OTRWNDQuNGguNDMydjEuNzU2YzAgLjIwNS4wNTcuMzY5LjE3Mi40OWEuNTg0LjU4NCAwIDAwLjQ0My4xODQuNzM0LjczNCAwIDAwLjMyNy0uMDgzLjcxNy43MTcgMCAwMC4zOTctLjY4NnptMS4yMjMgMS4xNXYtMi44MTFoLjQxN3YuNDI0aC4wM2EuNjc0LjY3NCAwIDAxLjI3OC0uMzM4LjgxNy44MTcgMCAwMS40NTMtLjEzIDQuODEgNC44MSAwIDAxLjIyNy4wMDd2LjQ0YTEuMjYyIDEuMjYyIDAgMDAtLjEtLjAxNy45ODYuOTg2IDAgMDAtLjE2My0uMDEzLjc2Mi43NjIgMCAwMC0uMzY2LjA4Ni42My42MyAwIDAwLS4zNDQuNTczdjEuNzc4aC0uNDMyem00LjU4OS0yLjgxMXYuMzY2aC0xLjQ1N3YtLjM2NmgxLjQ1N3ptLTEuMDMyLS42NzRoLjQzMnYyLjY4YzAgLjEyMS4wMTcuMjEzLjA1My4yNzQuMDM2LjA2LjA4My4xLjEzOS4xMi4wNTcuMDIuMTE3LjAzLjE4MS4wM2EuNzc1Ljc3NSAwIDAwLjE5LS4wMjJsLjA4OC4zODhhLjg5Mi44OTIgMCAwMS0uMzIyLjA1MS44Ny44NyAwIDAxLS4zNTktLjA3OS43MTIuNzEyIDAgMDEtLjI4OS0uMjQuNjkzLjY5MyAwIDAxLS4xMTMtLjQwNnYtMi43OTZ6bTEuNjgxIDMuNDg1di0yLjgxMWguNDE4di40MjRoLjAyOWEuNjc0LjY3NCAwIDAxLjI3OC0uMzM4LjgxNy44MTcgMCAwMS40NTQtLjEzIDQuODc5IDQuODc5IDAgMDEuMjI3LjAwN3YuNDRhMS4zMiAxLjMyIDAgMDAtLjEwMS0uMDE3Ljk3OC45NzggMCAwMC0uMTYzLS4wMTMuNzY4Ljc2OCAwIDAwLS4zNjYuMDg2LjYzMS42MzEgMCAwMC0uMzQ0LjU3M3YxLjc3OGgtLjQzMnptMy42ODktMS4xNVY0NC40aC40MzJ2Mi44MWgtLjQzMnYtLjQ3NWgtLjAyOWEuOTI1LjkyNSAwIDAxLS4zMDguMzY0Ljg4OC44ODggMCAwMS0uNTI3LjE0OC45MzcuOTM3IDAgMDEtLjQ2OC0uMTE1LjgwNC44MDQgMCAwMS0uMzIyLS4zNTIgMS4zMzYgMS4zMzYgMCAwMS0uMTE3LS41OTRWNDQuNGguNDMxdjEuNzU2YS42OS42OSAwIDAwLjE3Mi40OS41ODUuNTg1IDAgMDAuNDQzLjE4NC43MzUuNzM1IDAgMDAuMzI4LS4wODMuNzE3LjcxNyAwIDAwLjM5Ny0uNjg2em0zLjIxMy0xLjAzMmwtLjM4Ny4xMWEuNzU2Ljc1NiAwIDAwLS4xMDgtLjE4OC41MjYuNTI2IDAgMDAtLjE5MS0uMTU0LjY4Ny42ODcgMCAwMC0uMzA5LS4wNi43NC43NCAwIDAwLS40My4xMThjLS4xMTMuMDc4LS4xNy4xNzgtLjE3LjI5OSAwIC4xMDcuMDM5LjE5Mi4xMTcuMjU0LjA3OC4wNjIuMi4xMTQuMzY2LjE1NmwuNDE3LjEwMmMuMjUxLjA2MS40MzkuMTU0LjU2Mi4yOGEuNjU2LjY1NiAwIDAxLjE4NS40ODEuNzE4LjcxOCAwIDAxLS4xMzkuNDMyLjkyNi45MjYgMCAwMS0uMzg1LjNjLS4xNjQuMDczLS4zNTYuMTEtLjU3NC4xMS0uMjg3IDAtLjUyNC0uMDYyLS43MTItLjE4N2EuODI3LjgyNyAwIDAxLS4zNTctLjU0NWwuNDEtLjEwMmEuNTY4LjU2OCAwIDAwLjIyMi4zNC43NDIuNzQyIDAgMDAuNDMuMTEzYy4yMDEgMCAuMzYxLS4wNDIuNDc5LS4xMjguMTE5LS4wODYuMTc5LS4xOS4xNzktLjMxYS4zMjguMzI4IDAgMDAtLjEwMi0uMjQ2LjY1Ny42NTcgMCAwMC0uMzE1LS4xNWwtLjQ2OC0uMTFjLS4yNTgtLjA2LS40NDctLjE1NS0uNTY4LS4yODNhLjY4OS42ODkgMCAwMS0uMTc5LS40ODVjMC0uMTU5LjA0NS0uMy4xMzQtLjQyMWEuOTEuOTEgMCAwMS4zNjctLjI4N2MuMTU3LS4wNy4zMzMtLjEwNS41MzEtLjEwNS4yNzggMCAuNDk3LjA2MS42NTUuMTgzLjE2LjEyMi4yNzMuMjgzLjM0LjQ4M3ptMS45MjQtLjYyOXYuMzY2aC0xLjQ1NnYtLjM2NmgxLjQ1NnptLTEuMDMyLS42NzRoLjQzMnYyLjY4YzAgLjEyMS4wMTguMjEzLjA1My4yNzQuMDM3LjA2LjA4My4xLjEzOS4xMi4wNTcuMDIuMTE4LjAzLjE4MS4wM2EuNzY2Ljc2NiAwIDAwLjExNy0uMDA4bC4wNzQtLjAxNC4wODcuMzg4YS44ODkuODg5IDAgMDEtLjMyMi4wNTEuODY1Ljg2NSAwIDAxLS4zNTgtLjA3OS43MDYuNzA2IDAgMDEtLjI4OS0uMjQuNjg2LjY4NiAwIDAxLS4xMTQtLjQwNnYtMi43OTZ6bTIuODMgMy41NDNhMS4zMiAxLjMyIDAgMDEtLjcwMS0uMTggMS4yMDQgMS4yMDQgMCAwMS0uNDUyLS41MDQgMS43MjEgMS43MjEgMCAwMS0uMTU3LS43NThjMC0uMjg4LjA1Mi0uNTQyLjE1Ny0uNzYxLjEwNi0uMjIxLjI1NC0uMzkzLjQ0My0uNTE2LjE5LS4xMjUuNDEyLS4xODcuNjY2LS4xODcuMTQ2IDAgLjI5MS4wMjUuNDM0LjA3M2ExLjA5MSAxLjA5MSAwIDAxLjY2OS42N2MuMDcuMTguMTA1LjQuMTA1LjY2M3YuMTgyaC0yLjE2N3YtLjM3M2gxLjcyOGMwLS4xNTgtLjAzMi0uMy0uMDk2LS40MjRhLjcxNC43MTQgMCAwMC0uMjY3LS4yOTUuNzQ2Ljc0NiAwIDAwLS40MDYtLjEwOC43NzIuNzcyIDAgMDAtLjQ0Ni4xMjguODQuODQgMCAwMC0uMjg4LjMzLjk2OC45NjggMCAwMC0uMS40MzV2LjI0OWMwIC4yMTIuMDM2LjM5Mi4xMDkuNTRhLjc5Ni43OTYgMCAwMC4zMS4zMzUuOTAyLjkwMiAwIDAwLjQ1OS4xMTMuOTMuOTMgMCAwMC4zMDctLjA0OC42NTYuNjU2IDAgMDAuMjQtLjE0Ni42NzMuNjczIDAgMDAuMTU2LS4yNDVsLjQxNy4xMTdhLjkyNC45MjQgMCAwMS0uMjIyLjM3MyAxLjA2OCAxLjA2OCAwIDAxLS4zODQuMjUgMS40MjIgMS40MjIgMCAwMS0uNTE0LjA4N3ptMi44ODIgMGExLjEgMS4xIDAgMDEtLjYyLS4xNzggMS4xOSAxLjE5IDAgMDEtLjQyMS0uNTA1IDEuODE0IDEuODE0IDAgMDEtLjE1Mi0uNzc0YzAtLjI5NS4wNS0uNTUxLjE1Mi0uNzY4YTEuMTggMS4xOCAwIDAxLjQyMi0uNTAzIDEuMTIgMS4xMiAwIDAxLjYyNi0uMTc4Yy4xODMgMCAuMzI4LjAzLjQzNC4wOTIuMTA3LjA2LjE4OS4xMjguMjQ1LjIwNS4wNTcuMDc1LjEwMi4xMzguMTM0LjE4NmguMDM2di0xLjM4M2guNDMydjMuNzQ3aC0uNDE3di0uNDMxaC0uMDUxYTIuNzcgMi43NyAwIDAxLS4xMzYuMTk0LjguOCAwIDAxLS4yNS4yMDYuOTAzLjkwMyAwIDAxLS40MzQuMDl6bS4wNTgtLjM4OGEuNzEuNzEgMCAwMC40NC0uMTM1Ljg1Ljg1IDAgMDAuMjcyLS4zOGMuMDYyLS4xNjEuMDk0LS4zNDkuMDk0LS41NiAwLS4yMS0uMDMxLS4zOTQtLjA5Mi0uNTUyYS43OTkuNzk5IDAgMDAtLjI3MS0uMzcuNzE5LjcxOSAwIDAwLS40NDMtLjEzMy43MjYuNzI2IDAgMDAtLjQ1Ny4xNDEuODQyLjg0MiAwIDAwLS4yNzMuMzc5IDEuNTI0IDEuNTI0IDAgMDAtLjA4OS41MzRjMCAuMi4wMy4zODIuMDkxLjU0NWEuODkuODkgMCAwMC4yNzUuMzg4LjcxNC43MTQgMCAwMC40NTMuMTQzem0zLjUzIDEuMzgzVjQ0LjRoLjQxN3YuNDQ2aC4wNTJhMy40MSAzLjQxIDAgMDEuMTMxLS4xODYuNzc1Ljc3NSAwIDAxLjI0Ni0uMjA1Ljg4Ljg4IDAgMDEuNDM1LS4wOTJjLjIzNyAwIC40NDUuMDYuNjI2LjE3OC4xOC4xMTguMzIxLjI4Ni40MjMuNTAzLjEwMS4yMTcuMTUxLjQ3My4xNTEuNzY4IDAgLjI5OC0uMDUuNTU2LS4xNTEuNzc0YTEuMjA3IDEuMjA3IDAgMDEtLjQyMS41MDVjLS4xOC4xMTktLjM4Ni4xNzgtLjYyMS4xNzhhLjg5Ni44OTYgMCAwMS0uNDMzLS4wOS44MDUuODA1IDAgMDEtLjI1MS0uMjA2IDIuNDExIDIuNDExIDAgMDEtLjEzNS0uMTk0aC0uMDM3djEuNDg1aC0uNDMyem0uNDI1LTIuNDU5YzAgLjIxMi4wMzEuNC4wOTMuNTYyYS44NDQuODQ0IDAgMDAuMjczLjM3OWMuMTE5LjA5LjI2Ni4xMzUuNDM5LjEzNWEuNzEuNzEgMCAwMC40NTItLjE0My44NzIuODcyIDAgMDAuMjc0LS4zODhjLjA2Mi0uMTYzLjA5NC0uMzQ1LjA5NC0uNTQ1IDAtLjE5OC0uMDMxLS4zNzYtLjA5Mi0uNTM0YS44MjguODI4IDAgMDAtLjI3My0uMzc5LjcxNy43MTcgMCAwMC0uNDU1LS4xNC43MjEuNzIxIDAgMDAtLjQ0My4xMzMuNzk5Ljc5OSAwIDAwLS4yNzEuMzcgMS41MiAxLjUyIDAgMDAtLjA5MS41NXptMy41NDIgMS40NzFjLS4xNzggMC0uMzQtLjAzMy0uNDg1LS4xYS44MzcuODM3IDAgMDEtLjM0Ni0uMjk1LjgzNC44MzQgMCAwMS0uMTI4LS40NjhjMC0uMTYxLjAzMi0uMjkyLjA5Ni0uMzkyYS42Ny42NyAwIDAxLjI1NC0uMjM4Yy4xMDYtLjA1Ny4yMjMtLjEuMzUxLS4xMjguMTMtLjAzLjI1OS0uMDUyLjM5LS4wNy4xNzEtLjAyMS4zMDktLjAzOC40MTUtLjA0OWEuNjQuNjQgMCAwMC4yMzUtLjA2Yy4wNS0uMDI4LjA3NS0uMDc3LjA3NS0uMTQ3di0uMDE0YzAtLjE4LS4wNS0uMzIxLS4xNDktLjQyMS0uMDk3LS4xLS4yNDUtLjE1LS40NDQtLjE1LS4yMDYgMC0uMzY4LjA0NS0uNDg1LjEzNWEuNzk2Ljc5NiAwIDAwLS4yNDcuMjlsLS40MS0uMTQ3YS45ODMuOTgzIDAgMDEuMjkzLS4zOTljLjEyMy0uMDk2LjI1Ny0uMTYzLjQwMi0uMjAxYTEuNjggMS42OCAwIDAxLjQzMi0uMDU5Yy4wOSAwIC4xOTQuMDExLjMxMS4wMzMuMTE4LjAyLjIzMy4wNjQuMzQyLjEzYS43NzEuNzcxIDAgMDEuMjc3LjI5OGMuMDczLjEzMy4xMDkuMzExLjEwOS41MzV2MS44NTFoLS40MzF2LS4zOGgtLjAyMmEuODQzLjg0MyAwIDAxLS40MTkuMzczIDEuMDU0IDEuMDU0IDAgMDEtLjQxNi4wNzN6bS4wNjYtLjM4OGEuODU2Ljg1NiAwIDAwLjQzMi0uMS42ODkuNjg5IDAgMDAuMzU5LS41OTV2LS4zOTVjLS4wMTkuMDIyLS4wNTkuMDQyLS4xMjEuMDZhMi4wNzcgMi4wNzcgMCAwMS0uMjEyLjA0NiA5LjYzIDkuNjMgMCAwMS0uNDE0LjA1NSAxLjY1NiAxLjY1NiAwIDAwLS4zMTUuMDcxLjU0Ni41NDYgMCAwMC0uMjM0LjE0NS4zNy4zNyAwIDAwLS4wODguMjZjMCAuMTUuMDU2LjI2My4xNjcuMzRhLjc0Ni43NDYgMCAwMC40MjYuMTEzem0yLjAxMS4zMjN2LTIuODExaC40MTd2LjQyNGguMDI5YS42NzQuNjc0IDAgMDEuMjc4LS4zMzguODIuODIgMCAwMS40NTQtLjEzIDQuODc5IDQuODc5IDAgMDEuMjI3LjAwN3YuNDRhMS4zMiAxLjMyIDAgMDAtLjEwMS0uMDE3Ljk3OC45NzggMCAwMC0uMTYzLS4wMTMuNzY4Ljc2OCAwIDAwLS4zNjYuMDg2LjYzMS42MzEgMCAwMC0uMzQ0LjU3M3YxLjc3OGgtLjQzMXptMy4zMTUtMi44MTF2LjM2NmgtMS40NTZ2LS4zNjZoMS40NTZ6bS0xLjAzMi0uNjc0aC40MzJ2Mi42OGMwIC4xMjEuMDE4LjIxMy4wNTMuMjc0LjAzNy4wNi4wODMuMS4xMzkuMTJhLjU1LjU1IDAgMDAuMTgxLjAzLjc2Ni43NjYgMCAwMC4xMTctLjAwOGwuMDc0LS4wMTQuMDg3LjM4OGEuODg5Ljg4OSAwIDAxLS4zMjIuMDUxLjg2NS44NjUgMCAwMS0uMzU4LS4wNzkuNzEyLjcxMiAwIDAxLS4yODktLjI0LjY4Ni42ODYgMCAwMS0uMTE0LS40MDZ2LTIuNzk2em0yLjExNCAxLjc5NHYxLjY5aC0uNDMyVjQ0LjRoLjQxN3YuNDM5aC4wMzdhLjgwNS44MDUgMCAwMS4zLS4zNDQuOTMuOTMgMCAwMS41MTktLjEzMmMuMTkxIDAgLjM1Ny4wNC41LjExN2EuNzg2Ljc4NiAwIDAxLjMzMy4zNTJjLjA3OS4xNTYuMTE5LjM1My4xMTkuNTkydjEuNzg2aC0uNDMydi0xLjc1NmMwLS4yMjEtLjA1Ny0uMzkzLS4xNzItLjUxNmEuNjEuNjEgMCAwMC0uNDcyLS4xODcuNzU2Ljc1NiAwIDAwLS4zNy4wOS42NDEuNjQxIDAgMDAtLjI1NC4yNjEuODY3Ljg2NyAwIDAwLS4wOTMuNDE4em0zLjc2IDEuNzQ5Yy0uMjcgMC0uNTA0LS4wNi0uNy0uMThhMS4xOTcgMS4xOTcgMCAwMS0uNDUyLS41MDQgMS43MjEgMS43MjEgMCAwMS0uMTU4LS43NThjMC0uMjg4LjA1My0uNTQyLjE1OC0uNzYxYTEuMjQgMS4yNCAwIDAxLjQ0Mi0uNTE2IDEuMTkgMS4xOSAwIDAxLjY2Ny0uMTg3Yy4xNDYgMCAuMjkuMDI1LjQzMy4wNzNhMS4wODYgMS4wODYgMCAwMS42Ny42N2MuMDY5LjE4LjEwNC40LjEwNC42NjN2LjE4MmgtMi4xNjZ2LS4zNzNoMS43MjdjMC0uMTU4LS4wMzItLjMtLjA5NS0uNDI0YS43MTQuNzE0IDAgMDAtLjI2Ny0uMjk1Ljc0OC43NDggMCAwMC0uNDA2LS4xMDguNzc3Ljc3NyAwIDAwLS40NDcuMTI4Ljg0NS44NDUgMCAwMC0uMjg3LjMzLjk2OS45NjkgMCAwMC0uMTAxLjQzNXYuMjQ5YzAgLjIxMi4wMzcuMzkyLjExLjU0YS43ODguNzg4IDAgMDAuMzA5LjMzNS45MDcuOTA3IDAgMDAuNDU5LjExMy45MzYuOTM2IDAgMDAuMzA4LS4wNDguNjY0LjY2NCAwIDAwLjI0LS4xNDYuNjcuNjcgMCAwMC4xNTUtLjI0NWwuNDE3LjExN2EuOTIyLjkyMiAwIDAxLS4yMjEuMzczIDEuMDg2IDEuMDg2IDAgMDEtLjM4NC4yNSAxLjQyOCAxLjQyOCAwIDAxLS41MTUuMDg3em0xLjgyMS0uMDU4di0yLjgxMWguNDE3di40MjRoLjAzYS42NzQuNjc0IDAgMDEuMjc4LS4zMzguODE3LjgxNyAwIDAxLjQ1NC0uMTMgNC44MDcgNC44MDcgMCAwMS4yMjYuMDA3di40NGExLjI2MiAxLjI2MiAwIDAwLS4xLS4wMTcuOTg2Ljk4NiAwIDAwLS4xNjMtLjAxMy43NjIuNzYyIDAgMDAtLjM2Ni4wODYuNjMuNjMgMCAwMC0uMzQ0LjU3M3YxLjc3OGgtLjQzMnptMi40ODgtMy43NDhsLS4wMzYgMi42OTNoLS40MjVsLS4wMzctMi42OTNoLjQ5OHptLS4yNDkgMy43NzdhLjMxNy4zMTcgMCAwMS0uMjMyLS4wOTcuMzE2LjMxNiAwIDAxLS4wOTctLjIzM2MwLS4wOS4wMzItLjE2Ny4wOTctLjIzMmEuMzE3LjMxNyAwIDAxLjIzMi0uMDk3Yy4wOTEgMCAuMTY4LjAzMi4yMzMuMDk3YS4zMi4zMiAwIDAxLjA1MS4zOTcuMzQuMzQgMCAwMS0uMTE5LjEyLjMxNi4zMTYgMCAwMS0uMTY1LjA0NXoiIGZpbGw9IiMwMDQ3YWIiLz48L3N2Zz4="
                    :dotsOptionsHelper="{ colorType:{ single: true, gradient:false } }"
                    :backgroundOptions="{ color: '#ffffff' }"
                    :cornersSquareOptions="{ type: '', color: '#0047ab' }"
                    :cornersDotOptions="{ type: '', color: '#0047ab' }"
                    fileExt="png"
                    myclass="my-qur"
                    imgclass="img-qr"
                    :downloadOptions="{ name: 'vqr', extension: 'png' }"
                />
              </div>
            </div>
          </div>
          <div class="row" v-if="loadedUser !== undefined && (loadedUser.walletAddress === null || loadedUser.walletAddress === '')">
            <div class="col-12">
              <h1 class="text-warning">У вас ещё нет кошелька для хранения USDT!</h1>
              <button class="btn btn--main" @click="openWalletForUser">Нажмите сюда, что-бы создать кошелек</button>
            </div>
          </div>
        </div>
      </div><!-- /.card__body -->

    </div><!-- /.card -->

  </div><!-- /.tab-pane -->

</template>

<script>
/* eslint-disable*/
import UserService from "@/services/user.service";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import { SwappingSquaresSpinner  } from 'epic-spinners'
import QRCodeVue3 from "qrcode-vue3";

export default {
  name: "BalanceTab",
  components: {
    SwappingSquaresSpinner,
    QRCodeVue3
  },
  data() {
    return{
      loadedUser: undefined,
      loading: false,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    copyWalletAddress(){
      let el = this.$refs.waddress;
      navigator.clipboard.writeText(el.innerHTML);
      createToast(el.innerHTML + " - successfully copied!", {
        type: 'success',
        position: 'top-right',
        showIcon: true,
      });
    },
    openWalletForUser(){
      this.loading = true;
      UserService.openWalletForUser(this.loadedUser.userId).then(
          (response) => {
            createToast("Кошелек успешно создан!", {
              type: 'success',
              position: 'top-right',
              showIcon: true,
            });
            this.loading = false;
            this.loadUser();
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
            console.log(error);
            this.loadUser();
          }
      );
    },
    loadUser(){
      this.loading = true
      if (!this.currentUser) {
        this.$router.push('/login');
      } else {
        UserService.getUserById(this.currentUser.userId).then(
            (response) => {
              this.loadedUser = response.data
              this.loading = false
            },
            (error) => {
              this.loading = false
              console.log(error)
            }
        );
      }
    }
  },
  mounted() {
    this.loadUser();
  }
}
</script>

<style scoped>
.wAddress {
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
}
</style>

