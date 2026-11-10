
import QuantitySelector from '@/components/QuantitySelector'
import { products } from '@/data/products'
import { Product } from '@/types/product'
import Image from 'next/image'
import { notFound } from "next/navigation"

type Props = {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params
    const product: Product | undefined = products.find((e) => e.id.toString(16) === id)

    if (!product) notFound()

    return <div className='w-full'>
        <div className='grid grid-cols-1 md:grid-cols-3 grid-rows-1 max-w-7xl mx-auto w-full px-6 py-5 md:py-10 gap-8'>
            <div className='bg-red-400 col-span-2 h-full relative aspect-square'>
                <Image src={product?.image} alt={product?.name} fill />
            </div>

            <div className='w-full col-span-2 md:col-span-1'>
                <div className='space-y-4'>
                    <h1 className='text-4xl'>{product?.name}</h1>
                    <p className='text-sm'>{product?.price}</p>
                </div>
                <div className="divider w-full"></div>
                <QuantitySelector />
                <p className="text-sm my-4">{product?.description}</p>
            </div>
        </div>
    </div>
}