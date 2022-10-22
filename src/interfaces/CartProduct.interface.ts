import Product from './Product.interface';

export default interface CartProduct extends Product {
    quantity: number
}