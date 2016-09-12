	//********************************************************
	// SHOPPING CART FUNCTIONS

	var shoppingCart = {}

	shoppingCart.cart = []

	shoppingCart.shoppingItem = function(name, price, count) {
		this.name = name,
		this.price = price,
		this.count = count
	}
	//addItemToCart()
	shoppingCart.addItemToCart = function (name, price, count) {
		for (var i in this.cart) {
			if (this.cart[i].name === name) {
				this.cart[i].count += count 
				this.saveCart()
				return
			}
		}
		var item = new this.shoppingItem(name, price, count)
		this.cart.push(item)
		shoppingCart.saveCart()
	}

	shoppingCart.setCountForItem =function(name, count) {
		for (var i in this.cart) {
			if ( this.cart[i].name === name ) {
				this.cart[i].count = count
				break
			}
		}
		this.saveCart()
		displayCart()
	}
	//removeITemFromCart(name) // just one item
	shoppingCart.removeItemFromCart = function(name) {
		for (var i in this.cart) {
			if (this.cart[i].name === name) {
				this.cart[i].count --
				if (this.cart[i].count === 0 ) {
					this.cart.splice(i, 1)
				}
				break
			}
		}
		this.saveCart()
	}
	//removeItem FromCartAll(name) //remove all item 
	shoppingCart.removeItemFromCartAll = function(name) {
		for (var i in this.cart) {
			if (this.cart[i].name === name) {
				this.cart.splice(i, 1)
				break
			}

		}
		this.saveCart()
	}
	//clearCart()
	shoppingCart.clearCart = function() {
		this.cart = []
		this.saveCart()
	}
	//countCart() -> return total count
	shoppingCart.countCart = function() {
		var totalCount = 0
		for (var i in this.cart){
			totalCount += this.cart[i].count
		}
		return totalCount
	}
	//totalCart() -> return total cost
	shoppingCart.totalCart = function() {
		var totalCost = 0

		for (var i in this.cart) {
			totalCost += this.cart[i].price * this.cart[i].count
		}
		return totalCost.toFixed(2)
	}
	//listCart()  -> array of Items
	shoppingCart.listCart = function() {
		var cartCopy = []
		for (var i in this.cart) {
			var item = this.cart[i]
			var itemCopy = {}
			for (var p in item) {
				itemCopy[p] = item[p]
			}
			itemCopy.total = (item.price * item.count).toFixed(2)
			cartCopy.push(itemCopy)
		}
		return cartCopy
	}
	//saveCart() -> to check it later -> using local storage 
	shoppingCart.saveCart = function() {
		localStorage.setItem('shoppingCart', JSON.stringify(this.cart))
	}
	//loadCart() -> after saving
	shoppingCart.loadCart = function() {
		this.cart = JSON.parse(localStorage.getItem('shoppingCart'))
	}

	shoppingCart.loadCart()