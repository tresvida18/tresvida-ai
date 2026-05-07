'use client'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/components/supabase'
export default function Home() {
 const [product, setProduct] = useState('')
 const [results, setResults] = useState<any[]>([])
 const [filteredProducts, setFilteredProducts] = useState<string[]>([])
 const [productsData, setProductsData] = useState<any[]>([])
 useEffect(() => {
   fetchProducts()
 }, [])
 const fetchProducts = async () => {
   const { data, error } = await supabase
     .from('products')
     .select('*')
   if (error) {
     console.error(error)
     return
   }
   setProductsData(data)
 }
 const comparePrices = () => {
   const found = productsData.find(
     (p) => p.name.toLowerCase() === product.toLowerCase()
   )
   if (!found) {
     setResults([])
     return
   }
   const formattedResults = [
     {
       name: 'Blinkit',
       price: found.blinkit_price,
       time: found.blinkit_time
     },
     {
       name: 'Zepto',
       price: found.zepto_price,
       time: found.zepto_time
     },
     {
       name: 'Instamart',
       price: found.instamart_price,
       time: found.instamart_time
     }
   ]
   setResults(formattedResults)
   setFilteredProducts([])
 }
 const handleSearch = (value: string) => {
   setProduct(value)
   if (value.trim() === '') {
     setFilteredProducts([])
     return
   }
   const matches = productsData
     .filter((item) =>
       item.name.toLowerCase().startsWith(value.toLowerCase())
     )
     .map((item) => item.name)
   setFilteredProducts(matches)
 }
 const highestPrice =
   results.length > 0
     ? Math.max(...results.map((item) => item.price))
     : null
 const lowestPrice =
   results.length > 0
     ? Math.min(...results.map((item) => item.price))
     : null
 const fastestTime =
   results.length > 0
     ? Math.min(...results.map((item) => item.time))
     : null
 return (
<main
     style={{
       minHeight: '100vh',
       background:
         'radial-gradient(circle at top, #0f172a 0%, #020617 60%)',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       padding: '30px',
       fontFamily: 'Inter, sans-serif'
     }}
>
<div
       style={{
         width: '100%',
         maxWidth: '430px',
         background: 'rgba(15,23,42,0.88)',
         border: '1px solid rgba(148,163,184,0.15)',
         backdropFilter: 'blur(18px)',
         borderRadius: '28px',
         padding: '28px',
         boxShadow: '0 25px 50px rgba(0,0,0,0.45)'
       }}
>
<div
         style={{
           textAlign: 'center',
           marginBottom: '24px'
         }}
>
<h1
           style={{
             fontSize: '42px',
             lineHeight: '46px',
             marginBottom: '12px',
             fontWeight: '800',
             color: 'white'
           }}
>
           ⚡ QuickCart Compare
</h1>
<p
           style={{
             color: '#94a3b8',
             fontSize: '15px'
           }}
>
           Compare prices instantly across apps
</p>
</div>
<div
         style={{
           position: 'relative',
           marginBottom: '18px'
         }}
>
<input
           type="text"
           value={product}
           onChange={(e) => handleSearch(e.target.value)}
           placeholder="Search groceries..."
           style={{
             width: '100%',
             padding: '16px',
             borderRadius: '16px',
             border: '1px solid #1e293b',
             background: '#020617',
             color: 'white',
             fontSize: '15px',
             outline: 'none',
             boxSizing: 'border-box'
           }}
         />
         {filteredProducts.length > 0 && (
<div
             style={{
               position: 'absolute',
               top: '105%',
               left: 0,
               width: '100%',
               background: '#020617',
               border: '1px solid #1e293b',
               borderRadius: '14px',
               overflow: 'hidden',
               zIndex: 20
             }}
>
             {filteredProducts.map((item) => (
<div
                 key={item}
                 onClick={() => {
                   setProduct(item)
                   setFilteredProducts([])
                 }}
                 style={{
                   padding: '14px 16px',
                   cursor: 'pointer',
                   borderBottom: '1px solid #0f172a',
                   color: 'white'
                 }}
>
                 {item}
</div>
             ))}
</div>
         )}
</div>
<button
         onClick={comparePrices}
         style={{
           width: '100%',
           padding: '16px',
           borderRadius: '16px',
           border: 'none',
           background: 'linear-gradient(90deg,#84cc16,#4ade80)',
           color: '#052e16',
           fontWeight: '800',
           fontSize: '16px',
           cursor: 'pointer',
           marginBottom: '24px'
         }}
>
         Compare Prices
</button>
<div>
         {results.map((item) => (
<ProductCard
             key={item.name}
             item={item}
             isBest={item.price === lowestPrice}
             isFastest={item.time === fastestTime}
             highestPrice={highestPrice}
           />
         ))}
</div>
</div>
</main>
 )
}