import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/global/Navbar";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react"
import Link from "next/link";
import BoxReveal from "@/components/ui/box-reveal";
import NumberTicker from "@/components/ui/number-ticker";
import WordPullUp from "@/components/ui/words-pullup";
import RadialGradient from "@/components/global/radical-gradient";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import PartnersLogo from "@/components/global/PartnersLogo";
import HowUnique from "@/components/global/unique";
import WhoWeAre from "@/components/global/about";
import UpcommingHappenings from "@/components/global/UpcommingHappenings";
import BlogsSection from "@/components/global/blogs";
import OpenSource from "@/components/global/opensource";
import JoinCommunity from "@/components/global/join-community";
import Testimonials from "@/components/global/testimonials";
import CornerBorder from "@/components/ui/plusCornerBorder";
import Footer from "@/components/global/footer";

export default async function Home() {
    return (
        <div>
          <SpeedInsights />

          <main className="flex items-center justify-center overflow-x-hidden flex-col gap-10 md:mx-28">
            <Navbar />
            <GridPattern
              numSquares={40}
              maxOpacity={0.5}
              duration={3}
              repeatDelay={1}
              className={cn(
                "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-40%] h-[200%] skew-y-12"
              )}
            />

            <section className="h-auto w-full md:py-10 py-3 flex flex-col justify-center items-center md:gap-7 gap-3 mx-10">
              <RadialGradient className="-z-10" size={500} />

              <div className="inline-flex items-center justify-center rounded-[64px] p-[2px] bg-gradient-to-r from-[#483D8B]/40 to-[#FFB6C1]/40">
                <span className="rounded-[64px] bg-[#141421] text-center font-medium transition-all duration-300 ease-in-out h-7 px-3 py-1 text-sm leading-tight text-violet-50">
                  Join Our Discord Server!
                </span>
              </div>

              {/* Centering the CornerBorder and heading */}
              <div className="flex justify-center items-center w-full">
                <CornerBorder size="15px" color="#313140" thickness="2px">
                  <h2 className="text-center md:text-5xl text-2xl font-bold md:w-4/5 mx-auto">
                    Fastest Growing Community for Developers to
                    <WordPullUp
                      className="inline-block text-center md:text-5xl text-2xl font-bold ml-3"
                      words="Connect"
                    />
                    ,{" "}
                    <WordPullUp
                      className="inline-block text-center md:text-5xl text-2xl font-bold ml-3"
                      words="Learn"
                    />
                    and{" "}
                    <WordPullUp
                      className="inline-block text-center md:text-5xl text-2xl font-bold ml-3"
                      words="Develop"
                    />
                    Innovations Together
                    <span className="text-[#222238]">.</span>
                  </h2>
                </CornerBorder>
              </div>

              <Link href="/upload" className="flex overflow-hidden rounded-full">
                <AnimatedGradientText className="m-2">
                  <span
                    className={cn(
                      `animate-gradient flex md:text-xl text-xm bg-gradient-to-r from-[#ffaa40] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent bg-background`
                    )}
                  >
                    🎉
                    <hr className="mx-2 h-6 justify-center items-center flex w-[1px] shrink-0 bg-muted-foreground" />
                    {" "}
                    Start Blogging
                  </span>
                  <ChevronRight className="ml-1 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
              </Link>

              <div className="w-full h-auto md:py-10 py-4 md:px-3 px-2 md:gap-8 gap-5 border border-[#323232]/50 rounded-xl flex md:flex-row flex-col justify-center items-center bg-black/20 backdrop-blur-2xl z-10">
                <div className="flex flex-col justify-center items-center md:w-1/4">
                  <div className="flex gap-2 justify-center items-end text-center">
                    <p className="text-foreground text-xs text-center">Estimated</p>
                    <NumberTicker value={2500} className="md:text-4xl text-xl" /> Developers
                  </div>
                  <p className="text-muted-foreground text-sm text-center">
                    growing everyday rapidly
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center md:w-1/4">
                  <div className="flex gap-2 justify-center items-end text-center">
                    <p className="text-foreground text-xs text-center">Partnered</p>
                    <NumberTicker value={25} className="md:text-4xl text-xl" /> Communities
                  </div>
                  <p className="text-muted-foreground text-sm text-center">
                    partnered to reach more students
                  </p>
                </div>
                <BoxReveal className="flex flex-col justify-center items-center md:w-2/4 text-center md:text-start md:text-2xl text-lg text-foreground/90">
                  <p>
                    We help our community <span className="underline font-bold">developers</span>,
                    <br />
                    to make innovative product <span className="underline font-bold">with code.</span>
                  </p>
                </BoxReveal>
                <BorderBeam />
              </div>

              <div className="partners">
                <h2 className="mb-1 mx-auto text-center text-2xl md:text-4xl font-semibold tracking-tighter bg-gradient-to-b bg-clip-text -center text-transparent from-[#483D8B] to-[#FFB6C1]">
                  Community Partners
                </h2>

                <PartnersLogo />
              </div>
            </section>
          </main>
          <HowUnique />
          <WhoWeAre />
          <UpcommingHappenings />
          <BlogsSection />
          <OpenSource />
          <JoinCommunity />
          {/* <Testimonials /> */}
          <Footer/>

        </div>

    );
}
