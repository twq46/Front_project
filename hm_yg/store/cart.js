export default {
  //当前模块的命名空间
  namespaced:true,
  state:() => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]') 
  }),
  // 模块的 mutations 方法
    mutations: {
      //添加到购物车
      addToCart(state,goods){
        // 根据提交的商品的Id，查询购物车中是否存在这件商品,find方法会循环遍历数组中的每一项
        // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
        const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
        // console.log(findResult)
        if (!findResult) {
          // 如果购物车中没有这件商品，则直接 push
          state.cart.push(goods)
        } else {
          // 如果购物车中有这件商品，则只更新数量即可
          findResult.goods_count++
        }
        // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
        this.commit('m_cart/saveToStorage')
        // console.log(state.cart)
      },
      // 将购物车中的数据持久化存储到本地
      saveToStorage(state) {
         uni.setStorageSync('cart', JSON.stringify(state.cart))
      }
    },
    // 模块的 getters 属性
    getters: {
      // 统计购物车中商品的总数量
     total(state) {
        let c = 0
        // 循环统计商品的数量，累加到变量 c 中
        state.cart.forEach(goods => c += goods.goods_count)
        return c
     }
    },
}