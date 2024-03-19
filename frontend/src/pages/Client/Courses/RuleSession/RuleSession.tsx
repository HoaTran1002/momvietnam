const RuleSession = (): JSX.Element => {
    interface IRules {
        name: string,
        listRules: string[]
    }
    const rules: IRules[] = [
        {
            name: "Before the lesson:",
            listRules: [
                'Please be reminded to arrive at the studio at least 10 minutes before the session.',
                'Please take care of your own belongings. Lockers are provided in the studio for you to put your belongings.',
                'Please refrain from bringing your valuables to the lessons.',
                'Members with long hair are highly advised to tie up their hair.',
                'Please remove any watches, rings, bracelets or any hand accessories. You may opt to wear gloves which are available at the studio if you have any manicure or nail art.',
                'Please remember to wash and sanitise your hands.'
            ]
        },
        {
            name: "During the lesson:",
            listRules: [
                'Kindly expect a guided yet hands-on experience for all courses.',
                'Our class size will be kept to a maximum of 4 people.',
                'Cake, VietNam course: individual effort to prepare a product.',
                "Cooking and Kids: combined effort to prepare a meal."
            ]

        },
        {
            name: "After the lesson:",
            listRules: [
                'Please remember to keep your original recipe. (A recipe replacement fee of $10 shall be charged in case of any request for replacement.)'
            ]
        }
    ]
    return (
        <>
            <div className="mt-4 px-5 bg-white py-3">
                <h2 className="text-black uppercase text-2xl ">Studio Rules</h2>
                <span>
                    Photography and filming of lesson flow are not allowed during lessons.
                </span>
                <div >
                    {
                        rules.map((r: IRules, i: number) => (
                            <div key={i}>
                                <h3 className="text-black font-semibold">{r.name}</h3>
                                <ul>
                                    {
                                        r.listRules.map((item: string, index: number) => (
                                            <li key={index} className="flex items-center ml-3 gap-3 text-black">
                                                <i className="ri-checkbox-blank-circle-fill text-xs"></i>
                                                {item}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default RuleSession