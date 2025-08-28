import { boot } from 'quasar/wrappers'
import { Quasar, date } from 'quasar'
import lang from 'quasar/lang/pt-BR'

const customPortugueseLocale = {
  daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  }

lang.date.headerTitle = (dateVal) => {
  return date.formatDate(dateVal, 'ddd, D [de] MMM', customPortugueseLocale)
}
// A exportação do boot file deve ser feita desta forma
export default boot(() => {
  // Define o nosso pacote de idiomas customizado como o padrão do Quasar
  Quasar.lang.set(lang)
})

