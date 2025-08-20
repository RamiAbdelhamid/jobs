import React, { useState, Suspense } from 'react'

const AddJobForm = React.lazy(() => import('./Job/AddJobForm'))

function HeroSection() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <section className='relative w-full h-[420px] rounded-b-3xl overflow-hidden bg-gradient-to-tr from-indigo-50 to-white'>
                <img src="HeroSection.png" alt="البانر" className='absolute inset-0 w-full h-full object-cover opacity-40' />
                <div className='relative max-w-7xl mx-auto px-6 h-full flex flex-col items-start justify-center gap-4'>
                    <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900'>منصة يخوان للوظائف</h1>
                    <p className='text-lg md:text-xl text-gray-700'>ابحث عن الوظيفة المناسبة لك أو أضف وظيفة جديدة بسهولة</p>
                    <div className='flex items-center gap-3'>
                        <button className='bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-md'>باحث عن عمل</button>
                        <button onClick={() => setOpen(true)} className='bg-gray-900 hover:bg-black transition text-white px-4 py-2 rounded-md'>صاحب عمل</button>
                    </div>
                </div>
            </section>

            {open && (
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
                    <div className='absolute inset-0 bg-black/50' onClick={() => setOpen(false)} />
                    <div className='relative bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-auto p-6 shadow-xl'>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-2xl font-extrabold'>أضف وظيفة</h2>
                            <button onClick={() => setOpen(false)} className='text-gray-500 hover:text-gray-800'>إغلاق</button>
                        </div>
                        <Suspense fallback={<div className='py-10 text-center'>جارٍ التحميل...</div>}>
                            <AddJobForm />
                        </Suspense>
                    </div>
                </div>
            )}
        </>
    )
}

export default HeroSection