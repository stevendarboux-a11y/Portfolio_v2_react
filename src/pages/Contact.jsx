// ============================================================
//  PAGE CONTACT
//  - Canaux de contact (email avec bouton "copier", réseaux...).
//  - Formulaire "contrôlé" : React garde les valeurs dans un state.
//
//  ⚠️ GitHub Pages n'a pas de serveur : impossible d'envoyer un
//  email directement. À l'envoi, on ouvre donc la messagerie du
//  visiteur avec le message pré-rempli (lien "mailto:").
//  Plus tard, je devrais brancher un service comme Formspree ou
//  EmailJS dans handleSubmit pour un envoi direct.
// ============================================================

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import PageNav from "../components/PageNav";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import {
  CheckIcon,
  CopyIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PinIcon,
  SendIcon,
} from "../components/Icons";
import profile from "../data/profile";
import styles from "./Contact.module.css";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

// Vérifie le formulaire et renvoie un objet { champ: "message d'erreur" }
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Indique ton nom.";
  // Expression régulière simple : quelquechose@quelquechose.quelquechose
  if (!/^\S+@\S+\.\S+$/.test(form.email))
    errors.email = "Adresse email invalide.";
  if (form.message.trim().length < 10)
    errors.message = "Message trop court (10 caractères min.).";
  return errors;
}

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  // Un seul gestionnaire pour tous les champs grâce à l'attribut "name"
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // empêche le rechargement de la page

    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // encodeURIComponent protège les accents, espaces, retours à la ligne...
    const subject = encodeURIComponent(
      form.subject || `Contact portfolio — ${form.name}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n${form.name} — ${form.email}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setSent(true);
    setForm(EMPTY_FORM);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Le presse-papiers peut être bloqué par le navigateur : on ne fait rien
    }
  }

  const channels = [
    {
      icon: <LinkedinIcon />,
      label: "LinkedIn",
      value: "Voir mon profil",
      href: profile.socials.linkedin,
    },
    {
      icon: <GithubIcon />,
      label: "GitHub",
      value: "Voir mon code",
      href: profile.socials.github,
    },
    { icon: <PinIcon />, label: "Localisation", value: profile.location },
  ];

  return (
    <PageTransition>
      <SectionHeader
        code="04"
        label="Contact"
        title="Ouvrons un canal de communication"
        subtitle="Une alternance, un projet ou simplement une question ? Ma fréquence est ouverte."
      />

      <div className={styles.layout}>
        {/* ---------- Colonne des canaux ---------- */}
        <div className={styles.channels}>
          <Reveal className={`${styles.emailCard} glass`}>
            <span className={styles.channelIcon}>
              <MailIcon />
            </span>
            <div className={styles.emailText}>
              <p className={styles.channelLabel}>Email</p>
              <a href={`mailto:${profile.email}`} className={styles.email}>
                {profile.email}
              </a>
            </div>
            <button
              type="button"
              className={styles.copy}
              onClick={copyEmail}
              aria-label="Copier l'adresse email"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
            {/* Petite bulle "Copié !" animée */}
            <AnimatePresence>
              {copied && (
                <motion.span
                  className={styles.toast}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                >
                  Copié !
                </motion.span>
              )}
            </AnimatePresence>
          </Reveal>

          {channels.map((channel, index) => {
            const content = (
              <>
                <span className={styles.channelIcon}>{channel.icon}</span>
                <span>
                  <span className={styles.channelLabel}>{channel.label}</span>
                  <span className={styles.channelValue}>{channel.value}</span>
                </span>
              </>
            );
            return (
              <Reveal key={channel.label} delay={(index + 1) * 0.1}>
                {/* Lien si le canal a une URL, sinon simple bloc */}
                {channel.href ? (
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.channel} ${styles.channelLink} glass`}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={`${styles.channel} glass`}>{content}</div>
                )}
              </Reveal>
            );
          })}

          <Reveal delay={0.4} className={styles.availability}>
            <span className={styles.pulse} aria-hidden="true" />
            <p>
              <strong>Statut :</strong> disponible —{" "}
              {profile.availability.toLowerCase()}
            </p>
          </Reveal>
        </div>

        {/* ---------- Formulaire ---------- */}
        <Reveal delay={0.15} className={`${styles.formCard} glass`}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                className={styles.success}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className={styles.successIcon}>
                  <CheckIcon />
                </span>
                <h2>Transmission prête</h2>
                <p>
                  Ta messagerie s'est ouverte avec le message pré-rempli : il ne
                  reste plus qu'à l'envoyer. Merci, je te réponds au plus vite !
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setSent(false)}
                >
                  Nouveau message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate // on gère la validation nous-mêmes
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="hud-label">// Nouveau message</p>

                <div className={styles.row}>
                  <Field
                    label="Nom"
                    name="name"
                    value={form.name}
                    error={errors.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    error={errors.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
                <Field
                  label="Sujet (optionnel)"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                />
                <Field
                  label="Message"
                  name="message"
                  value={form.message}
                  error={errors.message}
                  onChange={handleChange}
                  textarea
                />

                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submit}`}
                >
                  Envoyer le message <SendIcon />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>

      <PageNav current="/contact" />
    </PageTransition>
  );
}

// Petit composant pour un champ (label + input + message d'erreur),
// pour ne pas répéter le même code 4 fois.
function Field({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
  textarea = false,
  autoComplete,
}) {
  const id = `field-${name}`;
  const InputTag = textarea ? "textarea" : "input";

  return (
    <div className={`${styles.field} ${error ? styles.fieldError : ""}`}>
      <label htmlFor={id}>{label}</label>
      <InputTag
        id={id}
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 6 : undefined}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Contact;
