import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axe from 'axe-core'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { LocaleProvider } from './i18n/LocaleContext'
import { dockerSnippet } from './lib/release'

function renderApp() {
  return render(
    <LocaleProvider>
      <App />
    </LocaleProvider>,
  )
}

describe('marketing site interactions', () => {
  it('switches locale and theme and persists both choices', async () => {
    const user = userEvent.setup()
    renderApp()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'A private space for records, history, and grounded answers',
    )

    await user.click(screen.getByRole('button', { name: '中文' }))
    expect(document.documentElement).toHaveAttribute('lang', 'zh-CN')
    expect(localStorage.getItem('sillage-page-locale')).toBe('zh')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '写下日常，回看历史，基于自己的记录提问',
    )

    await user.click(screen.getByRole('button', { name: '切换到深色主题' }))
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('sillage-page-theme')).toBe('dark')
  })

  it('moves focus into the mobile menu and restores it after Escape', async () => {
    const user = userEvent.setup()
    renderApp()
    const trigger = screen.getByRole('button', { name: 'Open menu' })

    await user.click(trigger)
    const menu = document.getElementById(trigger.getAttribute('aria-controls') ?? '')
    expect(menu).not.toBeNull()
    const firstItem = within(menu as HTMLElement).getByRole('link', { name: 'Features' })
    await waitFor(() => expect(firstItem).toHaveFocus())

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('button', { name: 'Close menu' })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('copies the deployment command and reports clipboard failures', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
    const view = renderApp()

    await user.click(screen.getByRole('button', { name: 'Copy' }))
    expect(writeText).toHaveBeenCalledWith(dockerSnippet())
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()

    view.unmount()
    writeText.mockRejectedValueOnce(new Error('permission denied'))
    renderApp()
    await user.click(screen.getByRole('button', { name: 'Copy' }))
    expect(screen.getByRole('button', { name: 'Copy failed' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Copy failed')
  })

  it('has no detectable automated accessibility violations', async () => {
    renderApp()
    const result = await axe.run(document.body, {
      rules: {
        'color-contrast': { enabled: false },
      },
    })
    expect(result.violations).toEqual([])
  })
})
