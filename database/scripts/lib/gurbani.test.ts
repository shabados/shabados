import { describe, expect, test } from 'bun:test'

import {
  classifyForm,
  colophonText,
  findVishraamFaults,
  isColophon,
  isHeading,
  isRahaoMarker,
  isUnbounded,
  parseEnding,
} from './gurbani'

// Every fixture is a real line, named by its line ID, so a failure points at the
// corpus rather than at an invented example.

describe('parseEnding', () => {
  test('TUL — the three-number form: padas, division, raag', () => {
    expect(parseEnding('ਹਉ. ਸਤਿਗੁਰੁ ਸੇਵੀ ਆਪਣਾ ॥੪॥੧॥੩੪॥')).toEqual({ pada: 4, stack: [1, 34] })
  })

  test('36FE — a closing line with a two-deep stack', () => {
    expect(parseEnding('ਜਨ ਨਾਨਕ ਪਿਆਸ ਚਰਨ ਕਮਲਨੑ ਕੀ; ਪੇਖਿ ਦਰਸੁ ਸੁਆਮੀ ਸੁਖ ਸਾਰੋ ॥੨॥੭॥੧੨੩॥')).toEqual({
      pada: 2,
      stack: [7, 123],
    })
  })

  test('8X0G — a rahao dooja contributes no pada; the numbers after it are the stack', () => {
    expect(parseEnding('ਪ੍ਰਭ ਕਿਰਪਾ ਤੇ; ਸਾਧਸੰਗਿ ਮੇਲਾ ॥੧॥ ਰਹਾਉ ਦੂਜਾ ॥੧੨॥੮੧॥')).toEqual({
      stack: [12, 81],
    })
  })

  test('7K86 — the marker need not carry a number at all', () => {
    expect(parseEnding('ਸਰਬ ਗੁਨਾ ਨਿਧਿ ਰਾਇਓ ॥ ਰਹਾਉ ਦੂਜਾ ॥੧੧॥੬੧॥')).toEqual({ stack: [11, 61] })
  })

  test('RB1K — a bare ॥ ਰਹਾਉ ॥ closes nothing and carries no stack', () => {
    expect(parseEnding('ਹਾਰਿ ਪਰਿਓ ਸੁਆਮੀ ਕੈ ਦੁਆਰੈ; ਦੀਜੈ ਬੁਧਿ ਬਿਬੇਕਾ ॥ ਰਹਾਉ ॥')).toEqual({ stack: [] })
  })

  // The rule this file exists for. Read as "the word ਰਹਾਉ" instead of "॥ then ਰਹਾਉ",
  // this line's ॥੮॥ vanishes and the shabad reports a missing pada 8.
  test('J41W — ਰਹਾਉ mid-verse is not a marker, and ॥੮॥ is pada 8', () => {
    expect(parseEnding('ਮੈ ਗੁਰਬਾਣੀ ਆਧਾਰੁ ਹੈ; ਗੁਰਬਾਣੀ ਲਾਗਿ ਰਹਾਉ ॥੮॥')).toEqual({ pada: 8, stack: [] })
  })

  test('an ordinary mid-shabad line closes nothing', () => {
    expect(parseEnding('ਆਗੈ ਪਾਛੈ ਕੁਸਲੁ ਭਇਆ ॥')).toEqual({ stack: [] })
  })
})

describe('isRahaoMarker', () => {
  test('RB1K is a marker, J41W is not', () => {
    expect(isRahaoMarker('ਦੀਜੈ ਬੁਧਿ ਬਿਬੇਕਾ ॥ ਰਹਾਉ ॥')).toBe(true)
    expect(isRahaoMarker('ਗੁਰਬਾਣੀ ਲਾਗਿ ਰਹਾਉ ॥੮॥')).toBe(false)
  })
})

describe('isHeading', () => {
  test('NEKY — the heading stranded at the end of BBH', () => {
    expect(isHeading('ਬਿਲਾਵਲੁ ਮਹਲਾ ੫ ॥')).toBe(true)
  })

  test('N0SF — a long compound heading still reads as one', () => {
    expect(isHeading('ਗਉੜੀ ਕਬੀਰ ਜੀ ਕੀ ਨਾਲਿ ਰਲਾਇ ਲਿਖਿਆ ਮਹਲਾ ੫ ॥')).toBe(true)
  })

  test('36FE — a line carrying a count is verse, not a heading', () => {
    expect(isHeading('ਜਨ ਨਾਨਕ ਪਿਆਸ ਚਰਨ ਕਮਲਨੑ ਕੀ; ਪੇਖਿ ਦਰਸੁ ਸੁਆਮੀ ਸੁਖ ਸਾਰੋ ॥੨॥੭॥੧੨੩॥')).toBe(false)
  })

  // The case that broke the old vocabulary-based rule. A bare raag name is a
  // heading, and 203 SGGS groups open with one; a word list containing ਰਾਗੁ but
  // not the raag names rejected every one of them.
  test('a bare raag name is a heading', () => {
    expect(isHeading('ਆਸਾ ॥')).toBe(true)
    expect(isHeading('ਗਉੜੀ ਕਬੀਰ ਜੀ ॥')).toBe(true)
    expect(isHeading('ਦੇਵਗੰਧਾਰੀ ੫ ॥')).toBe(true)
  })

  test('a mangal opens a division alongside a heading, and is not one', () => {
    expect(isHeading('ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥')).toBe(false)
  })

  // FF5/MRU2. Counting ॥ as a word made this eleven tokens and rejected it, which
  // is how the heading-only scan came up one short of the five that exist.
  test('MRU2 — an internal ॥ does not count toward the word limit', () => {
    expect(isHeading('ਰਾਗੁ ਗੋਂਡ ਬਾਣੀ ਭਗਤਾ ਕੀ ॥ ਕਬੀਰ ਜੀ ਘਰੁ ੧ ॥')).toBe(true)
  })

  // A vishraam disqualifies before the heading words are consulted: this line
  // contains ਕਬੀਰ but is verse, and was misread as a title once.
  test('a line with a vishraam is verse even when it contains a heading word', () => {
    expect(isHeading('ਕਬੀਰ. ਭਲੀ ਮਧੂਕਰੀ; ਨਾਨਾ ਬਿਧਿ ਕੋ ਨਾਜੁ ॥')).toBe(false)
  })
})

describe('classifyForm', () => {
  test('ਪਵੜੀ is a pauri — the spelling variant that swallowed five groups in Raag Gauree', () => {
    expect(classifyForm('ਪਵੜੀ ॥')).toBe('pauri')
    expect(classifyForm('ਪਉੜੀ ॥')).toBe('pauri')
  })

  test('the lead-in forms', () => {
    expect(classifyForm('ਸਲੋਕੁ ॥')).toBe('salok')
    expect(classifyForm('ਡਖਣਾ ॥')).toBe('dakhna')
    expect(classifyForm('ਛੰਤੁ ॥')).toBe('chhant')
  })

  test('an unmarked heading is a shabad', () => {
    expect(classifyForm('ਸਿਰੀਰਾਗੁ ਮਹਲਾ ੧ ॥')).toBe('shabad')
  })
})

describe('findVishraamFaults', () => {
  test('T4FX — a doubled marker leaves one with no word before it', () => {
    const faults = findVishraamFaults('ਹਲਤੁ ਪਲਤੁ ਦੋਵੈ ਗਵਾਏ ਸੁਪਨੈ; ਸੁਖੁ. .ਨ ਪਾਵਣਿਆ ॥੪॥')
    expect(faults).toHaveLength(1)
    expect(faults[0]?.reason).toBe('no-word-before')
  })

  test('7K2S — a stray marker with no partner', () => {
    const faults = findVishraamFaults('ਅਸਥਿਤੰ, ਸੋਗ ਹਰਖੰ; ਭੈ ਖੀਣੰ .ਤ ਨਿਰਭਵਹ ॥')
    expect(faults).toHaveLength(1)
    expect(faults[0]?.reason).toBe('no-word-before')
  })

  test('well-formed vishraams raise nothing', () => {
    expect(findVishraamFaults('ਪੰਚ ਜਨਾ ਸਿਉ ਸੰਗੁ. ਨ ਛੁਟਕਿਓ; ਅਧਿਕ ਅਹੰਬੁਧਿ ਬਾਧੇ ॥੧॥')).toEqual([])
  })
})

describe('isColophon', () => {
  test('the three kinds', () => {
    expect(isColophon('3UFU')).toBe(true) // tally
    expect(isColophon('7LAQ')).toBe(true) // instruction
    expect(isColophon('K50V')).toBe(true) // tally, and the one a word list hid
  })

  test('an ordinary line is not one', () => {
    expect(isColophon('NEKY')).toBe(false)
  })

  test('the lookup carries its text, so an entry can be checked by eye', () => {
    expect(colophonText('K50V')).toBe('ਦੂਜੇ ਘਰ ਕੇ ਚਉਤੀਸ ॥')
  })
})

describe('isUnbounded', () => {
  // Confirmed by review, not detected. 5FC is the one-line Surdas verse; GU2 ends
  // without the zoning that closes a shabad. Neither is a defect.
  test('the two known unbounded groups', () => {
    expect(isUnbounded('5FC')).toBe(true)
    expect(isUnbounded('GU2')).toBe(true)
  })

  test('an ordinary group is not one', () => {
    expect(isUnbounded('2DH')).toBe(false)
  })
})
