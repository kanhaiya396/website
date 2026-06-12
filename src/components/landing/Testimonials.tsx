import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Outworx is simple to use, fast to scan documents and smart in how it pulls out what matters. The VAT handling and descriptions are better than anything we've seen.",
    author: "Jenny Evans",
    role: "Accounts & Outsourcing Director",
    company: "Wilson Partners",
  },
  {
    quote: "I am LOVING the way it looks at previous stuff and works out where the current stuff should go.",
    author: "Grace Mock FMAAT",
    role: "Director",
    company: "Grace Heathfield + Co",
  },
  {
    quote: "VAT extraction is spot on every time. It's good at picking up reverse charge transactions, many bookkeepers wouldn't pick that up!",
    author: "Matthew Cotson",
    role: "Director",
    company: "Blu Sky",
  },
  {
    quote: "It has certainly helped both us and our clients a lot already - no more spreadsheets and miscalculation from human error.",
    author: "Crystal Boston BFP FCA",
    role: "Co-Founder & Partner",
    company: "Delphini",
  },
];

const trustedBy = [
  { name: "Price Bailey", url: "https://www.pricebailey.co.uk" },
  { name: "Smooth Accounting", url: "https://smoothaccounting.co.uk" },
  { name: "Wilson Partners", url: "https://www.wilson-partners.co.uk" },
  { name: "Acumist", url: "https://acumist.com" },
  { name: "Finance Box", url: "https://www.financebox.co.uk" },
  { name: "Delphini", url: "https://www.delphini.co.uk" },
  { name: "Lubbock Fine", url: "https://www.lubbockfine.co.uk" },
  { name: "HJS Accountants", url: "https://www.hjsaccountants.co.uk" },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium mb-8">
            Trusted by leading accounting firms
          </span>
          
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {trustedBy.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium">{company}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card"
            >
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}