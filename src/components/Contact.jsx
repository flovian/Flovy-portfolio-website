import { useState } from 'react'
import { contact, profile } from '../data/content'
import { useMagnetic } from '../hooks/useReveal'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { ArrowUpRight, GitHub, LinkedIn, Mail, Pin } from './icons'

const initialForm = { name: '', email: '', message: '' }

const iconFor = (label) =>
  ({ Email: Mail, LinkedIn: LinkedIn, GitHub: GitHub, Location: Pin })[label]

function ChannelCard({ channel, i }) {
  const tiltRef = useMagnetic({ strength: 0.1, radius: 60 })
  const Icon = iconFor(channel.label)

  const shared = {
    className:
      'card card-lift spotlight group relative flex h-full flex-col p-6',
  }

  const inner = (
    <>
      <span
        className="pointer-events-none absolute -right-2 -top-3 text-5xl leading-none tracking-tightest text-ink/[0.04] transition-colors duration-500 group-hover:text-gold/15"
        aria-hidden="true"
      >
        {String(i + 1).padStart(2, '0')}
      </span>

      <div className="relative flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-gold transition-all duration-300 group-hover:border-gold-soft group-hover:bg-gold group-hover:text-ink">
          <Icon />
        </span>
        {channel.href && (
          <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
        )}
      </div>

      <p className="relative mt-6 font-mono text-[0.65rem] uppercase tracking-eyebrow text-ink-faint">
        {channel.label}
      </p>
      <p className="relative mt-1.5 break-words text-base text-ink">
        {channel.value}
      </p>
    </>
  )

  return (
    <Reveal delay={i * 60}>
      {channel.href ? (
        <a
          ref={tiltRef}
          href={channel.href}
          {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          className={`${shared.className} cursor-pointer`}
        >
          {inner}
        </a>
      ) : (
        <div ref={tiltRef} className={shared.className}>
          {inner}
        </div>
      )}
    </Reveal>
  )
}

export function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const buildMailto = () => {
    const subject = `Project enquiry from ${form.name || 'your website'}`
    const body = [
      form.message,
      '',
      '—',
      `${form.name} (${form.email})`,
    ].join('\n')

    return `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  // No endpoint configured means the form always opens the visitor's mail
  // client with everything pre-filled, so it lands in the inbox either way.
  const openMailClient = () => {
    window.location.href = buildMailto()
    setStatus({ state: 'success', message: contact.form.successMessage })
    setForm(initialForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ state: 'error', message: 'Please fill in every field.' })
      return
    }

    if (!contact.form.endpoint) {
      openMailClient()
      return
    }

    setStatus({ state: 'loading', message: 'Sending…' })

    try {
      const response = await fetch(contact.form.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error('Request failed')

      setStatus({ state: 'success', message: contact.form.successMessage })
      setForm(initialForm)
    } catch {
      // Endpoint is down or blocked — don't lose the message, hand off to mail
      openMailClient()
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow={contact.eyebrow}
          heading={contact.heading}
          subtitle={contact.subtitle}
        />

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-4">
          {contact.channels.map((channel, i) => (
            <ChannelCard key={channel.label} channel={channel} i={i} />
          ))}
        </div>

        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="card spotlight relative mt-5 overflow-hidden bg-surface p-8 sm:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-wash" aria-hidden="true" />

            <div className="relative grid gap-6 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                placeholder={contact.form.namePlaceholder}
                value={form.name}
                onChange={update('name')}
              />
              <Field
                id="email"
                type="email"
                label="Email"
                placeholder={contact.form.emailPlaceholder}
                value={form.email}
                onChange={update('email')}
              />
            </div>

            <div className="relative mt-6">
              <Field
                id="message"
                as="textarea"
                label="Message"
                placeholder={contact.form.messagePlaceholder}
                value={form.message}
                onChange={update('message')}
              />
            </div>

            <div className="relative mt-8 flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status.state === 'loading'}
                className="btn-primary disabled:opacity-60"
              >
                {status.state === 'loading' ? 'Sending…' : contact.form.submitLabel}
                <ArrowUpRight />
              </button>

              {status.message && (
                <p
                  role="status"
                  className={`text-sm ${
                    status.state === 'error' ? 'text-red-600' : 'text-gold-deep'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ id, label, as = 'input', type = 'text', ...props }) {
  const Tag = as

  return (
    <label htmlFor={id} className="block">
      <span className="font-mono text-[0.65rem] uppercase tracking-eyebrow text-ink-faint">
        {label}
      </span>
      <Tag
        id={id}
        type={as === 'input' ? type : undefined}
        {...props}
        className={`mt-2.5 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink transition-all duration-300 placeholder:text-ink-faint hover:border-line-strong focus:border-gold focus:bg-surface focus:outline-none ${
          as === 'textarea' ? 'min-h-[9rem] resize-y' : ''
        }`}
      />
    </label>
  )
}
