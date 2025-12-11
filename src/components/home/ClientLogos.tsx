import { motion } from "framer-motion";

const clients = [
  { name: "Tanzania Breweries", initials: "TB" },
  { name: "Vodacom Tanzania", initials: "VT" },
  { name: "CRDB Bank", initials: "CB" },
  { name: "NMB Bank", initials: "NM" },
  { name: "Azania Bank", initials: "AB" },
  { name: "TPC Ltd", initials: "TP" },
  { name: "Mwananchi Communications", initials: "MC" },
  { name: "TANESCO", initials: "TE" },
  { name: "DAWASCO", initials: "DA" },
  { name: "Julius Nyerere Airport", initials: "JN" },
  { name: "Serena Hotels", initials: "SH" },
  { name: "Barclays Bank", initials: "BB" },
];

const ClientLogos = () => {
  return (
    <section className="py-12 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
            Trusted By Industry Leaders
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Our Valued <span className="text-primary">Partners</span>
          </h2>
        </motion.div>
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10" />

        {/* First Row - Moving Left */}
        <div className="flex mb-6">
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -50 * clients.length * 2.5] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="w-40 h-20 bg-card border border-border rounded-xl flex items-center justify-center gap-3 px-4 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:scale-105">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {client.initials}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Moving Right */}
        <div className="flex">
          <motion.div
            className="flex gap-6"
            initial={{ x: -50 * clients.length * 2.5 }}
            animate={{ x: [-50 * clients.length * 2.5, 0] }}
            transition={{
              x: {
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {[...clients.slice().reverse(), ...clients.slice().reverse(), ...clients.slice().reverse()].map((client, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="w-40 h-20 bg-card border border-border rounded-xl flex items-center justify-center gap-3 px-4 transition-all duration-300 group-hover:border-secondary/50 group-hover:shadow-lg group-hover:scale-105">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center text-secondary-foreground font-bold text-sm">
                    {client.initials}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container mx-auto px-4 mt-10"
      >
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">150+</div>
            <div className="text-xs text-muted-foreground">Corporate Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">12+</div>
            <div className="text-xs text-muted-foreground">Industry Sectors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">98%</div>
            <div className="text-xs text-muted-foreground">Client Retention</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">25+</div>
            <div className="text-xs text-muted-foreground">Years Partnership</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ClientLogos;
