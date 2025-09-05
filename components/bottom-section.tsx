import Link from "next/link";

export function BottomSection() {
  return (
    <section className="py-20 bg-muted/20">
     
                    <div className="bg-white pt-10 pb-40  px-4">
                        <div className="max-w-5xl mx-auto">
                            <p className="text-center text-sm text-gray-700 leading-relaxed">
                                All content on this site is for educational purposes only and does not constitute financial advice.
                                Investing in stocks involves risks, including the loss of principal. Past performance is not indicative
                                of future results and is influenced by market conditions. Conduct your own research or consult a
                                financial advisor before making any investment decisions. The author is not responsible for any financial
                                losses or gains resulting from the use of this information.
                                <br /><br />
                                This site is not a part of the Facebook™ website or Facebook™ Inc. Additionally, this site is NOT endorsed
                                by Facebook™ in any way. FACEBOOK™ is a trademark of FACEBOOK™, Inc.
                                <br /><br />
                                As stipulated by law, we can not and do not make any guarantees about your ability to get results or earn
                                any money with our ideas, information, tools or strategies. We just want to help you by giving great content,
                                direction and strategies that worked well for us and our students and that we believe can move you forward.
                                <br /><br />
                                All of our terms, privacy policies, and disclaimers for this program and website can be accessed via the link above.
                                We feel transparency is important and we hold ourselves and you to a high standard of integrity.
                                <br /><br />
                                Thanks for stopping by. We hope this training and content brings you a lot of value.
                            </p>
                        </div>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white inset-shadow-sm px-4 py-2 md:py-4 shadow-md border-t border-gray-200">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-1 md:gap-4 max-w-6xl mx-auto">
                            <div className="text-center md:text-left">
                                <span className="text-lg md:text-2xl font-bold text-black block">
                                    Join Our Premium Stock Advisory
                                </span>
                                <span className="text-gray-700 block">
                                    Get expert trade recommendations, real-time updates & full support
                                </span>
                            </div>
                            <Link href="#form">
                                <button className="bg-background text-primary hover:bg-background/90 font-bold px-8 py-3 shadow-lg border-2 border-background/20 border-radius-lg transition-all duration-300 border-cursor-pointer border-1 border-solid">
Register Now For Free                                </button>
                            </Link>
                        </div>
                    </div>
    </section>
  )
}
