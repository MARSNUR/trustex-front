<template>
  <div class="modal fade show" style="display: block; padding-right: 17px;" id="modalAdd" tabindex="-1">
    <div class="modal-dialog  modal-dialog-centered">
      <div class="x-card  modal-content">
        <div class="x-card__header">
          <h2 class="x-card__title">Добавление метода оплаты</h2>
        </div>

        <div class="x-card__body">

          <div class="form">
            <div class="form__group">
              <input class="field" id="name" type="text" placeholder="Номер карты">
            </div>

            <div class="form__group">
              <input class="field" id="name" type="text" placeholder="Имя Фамилия">
            </div>

            <div class="form__group" style="width: 110px">
              <input class="field" id="name" type="text" placeholder="ММ / ГГ">
            </div>
          </div>

        </div>

        <div class="modal__footer">
          <button type="button" class="btn  btn--main">Добавить</button>
          <button type="button" class="btn  btn--transparent" data-dismiss="modal">Отмена</button>
        </div>
      </div>
    </div>

  </div>
  <div class="modal-backdrop fade show"></div>
</template>

<script>
export default {
  name: "ModalComponent"
}
</script>
