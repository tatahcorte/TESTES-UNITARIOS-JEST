import Lance from '@/components/Lance.vue'
import { mount } from '@vue/test-utils'

describe('um lance sem valor minino', () => {
  test('não aceita lance com valor menor do que zero', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')

    input.setValue(-100)
    const lancesEmitidos = wrapper.emitted('novo-lance')
    wrapper.trigger('submit')

    expect(lancesEmitidos).toBeUndefined()
  })

  test('emite um lance quando o valor é maior que zero', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')

    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')

    expect(lancesEmitidos).toHaveLength(1)
  })

  test('emite o valor esperado de um lance valido', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(100)
  })
})
describe('um lance com valor minino', () => {
  test('todos os lances devem possuir um valor do que o minimo informado', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })
})

test('emite o valor esperado de um lance valido', () => {
  const wrapper = mount(Lance, {
    propsData: {
      lanceMinimo: 300
    }
  })
  const input = wrapper.find('input')
  input.setValue(400)
  wrapper.trigger('submit')
  const lancesEmitidos = wrapper.emitted('novo-lance')
  const valorLance = parseInt(lancesEmitidos[0])
  expect(valorLance).toBe(400)
})
test('não são aceitos lances com valores menores do que o minimo informado', async () => {
  const wrapper = mount(Lance, {
    propsData: {
      lanceMinimo: 300
    }
  })
  const input = wrapper.find('input')
  input.setValue(100)
  wrapper.trigger('submit')
  await wrapper.vm.$nextTick() // evento que precisa aguardar para que o DOM seja atualizado
  const mensagemErro = wrapper.find('p.alert').element.textContent
  const mensagemEsperada = 'O valor mínimo para o lance é de R$ 300'
  expect(mensagemErro).toContain(mensagemEsperada)
})
// A RENDERIZACAO DO DOM EM COMPONENTE VUE É ASSINCRONA
