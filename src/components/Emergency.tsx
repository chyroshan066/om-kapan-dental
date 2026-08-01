export const Emergency = () => (
    <section className="section my-20">
            <div className="container">
                <div className="flex flex-col lg:flex-row items-center gap-x-20 gap-y-12">
                    {/* Emergency image */}
                    <div>
                        <img className="hidden lg:block" src="/images/emergency-desktop.webp" alt="emergency-desktop" />
                        <img className="lg:hidden" src="/images/emergency-mobile.webp" alt="emergency-mobile" />
                    </div>
                    {/* Emergency Contents */}
                    <div className="flex flex-col gap-y-4 text-center lg:text-start">
                        {/* Title */}
                        <h4 className="text-sm text-primary font-bold">Dental 24H Emergency</h4>
                        {/* Subtitle */}
                        <p className="text-slate-800 text-4xl leading-snug font-bold sm:max-w-screen-sm">friendly treatment from our locally practice.</p>
                        {/* Description */}
                        <p className="max-w-lg lg:max-w-md mx-auto lg:mx-0 text-[15px] font-medium text-slate-800/70">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                        {/* Button Call to Action */}
                        <a className="h-12 w-44 mx-auto bg-primary text-white text-sm font-bold text-center leading-[3rem] mt-6 lg:mt-8 lg:mx-0 rounded-xl transition-colors hover:bg-indigo-800" href="#">Book appointment</a>
                    </div>
                </div>
            </div>
        </section>
)