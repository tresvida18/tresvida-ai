export default function Home() {
 return (
<main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">

<h1 className="text-4xl font-bold mb-6">
       🛒 TresVida AI Shopper
</h1>

<p className="mb-6 text-gray-600">
       Compare prices across Blinkit, Zepto, Instamart instantly
</p>

<input
       type="text"
       placeholder="e.g. Compare onion 1kg price across apps"
       className="w-full max-w-xl p-3 border rounded-lg mb-4"
     />

<button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
       Compare
</button>

<div className="mt-8 w-full max-w-xl bg-white p-4 rounded-lg shadow">
<p className="text-gray-500 text-center">
         Results will appear here...
</p>
</div>

</main>
 );
}