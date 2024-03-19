// import React from 'react'
import { useTranslation } from 'react-i18next'
const SloganFooter = (): JSX.Element => {
    const { t } = useTranslation(['home'])
    return (
        <div className='col-span-12 bg-[#9eb26c] py-9 text-white uppercase text-2xl font-semibold text-center' >
            {t('home:sloganBanner')}
        </div>
    )
}
export default SloganFooter