import React from "react"
import { Layout } from "@/components/layout/Layout"
import { Hero } from "@/components/home/Hero/Hero"
import { Services } from "@/components/home/Services"
import { IntroCard } from "@/components/home/IntroCard"
import { FeaturedTestimonials } from "@/components/home/FeaturedTestimonials"

const IndexPage: React.FC = () => {
    return (
        <Layout>
            <Hero />
            <Services />
            <IntroCard />
            <FeaturedTestimonials />
        </Layout>
    )
}

export default IndexPage

export const Head = () => <title>Home - Virtual Chamber</title>