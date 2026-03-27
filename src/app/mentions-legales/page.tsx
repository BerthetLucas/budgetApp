import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-background min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4"
          >
            ← Retour
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            Mentions légales
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Dernière mise à jour : mars 2026
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="font-bold">1. Éditeur du site</h2>
          <p className="text-sm leading-relaxed">
            Ce site est édité à titre personnel par :{" "}
            <strong>BerthetLucas</strong>
            <br />
            France
            <br />
            Contact :{" "}
            <a
              href="mailto:lu.berthet@gmail.com"
              className="underline underline-offset-4"
            >
              lu.berthet@gmail.com
            </a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold">2. Hébergeur</h2>
          <p className="text-sm leading-relaxed">
            Vercel Inc.
            <br />
            340 Pine Street, Suite 701 — San Francisco, CA 94104, États-Unis
            <br />
            Site : vercel.com
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold">3. Données personnelles (RGPD)</h2>
          <p className="text-sm leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données
            (RGPD — UE 2016/679) et à la loi Informatique et Libertés, vous
            disposez de droits sur vos données personnelles.
          </p>

          <h3 className="pt-2 text-sm font-semibold">
            Données collectées et finalité
          </h3>
          <ul className="text-muted-foreground list-disc pl-5 text-sm leading-relaxed">
            <li>
              <strong>Adresse e-mail</strong> — création et authentification du
              compte
            </li>
            <li>
              <strong>Mot de passe</strong> — stocké sous forme chiffrée
              (hachage), jamais lisible
            </li>
            <li>
              <strong>Données financières saisies</strong> (transactions,
              budgets) — fonctionnement du service
            </li>
          </ul>

          <h3 className="pt-2 text-sm font-semibold">Durée de conservation</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Les données sont conservées le temps de l&apos;existence du compte. À la
            suppression du compte, toutes les données sont effacées.
          </p>

          <h3 className="pt-2 text-sm font-semibold">
            Base légale du traitement
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Le traitement est fondé sur l&apos;exécution du contrat (art. 6.1.b RGPD)
            — vous utilisez le service en connaissance de cause.
          </p>

          <h3 className="pt-2 text-sm font-semibold">Vos droits</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
            portabilité et d&apos;opposition sur vos données. Pour exercer ces
            droits, contactez :{" "}
            <a
              href="mailto:lu.berthet@gmail.com"
              className="underline underline-offset-4"
            >
              lu.berthet@gmail.com
            </a>
            <br />
            En cas de litige, vous pouvez introduire une réclamation auprès de
            la <strong>CNIL</strong> (cnil.fr).
          </p>

          <h3 className="pt-2 text-sm font-semibold">Transfert de données</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Les données sont hébergées par Vercel (États-Unis). Ce transfert est
            encadré par les clauses contractuelles types de la Commission
            européenne.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold">4. Cookies</h2>
          <p className="text-sm leading-relaxed">
            Ce site utilise uniquement un cookie de session nécessaire au
            fonctionnement de l&apos;authentification. Aucun cookie publicitaire ou
            de tracking tiers n&apos;est utilisé.
          </p>
        </section>
      </div>
    </div>
  );
}
