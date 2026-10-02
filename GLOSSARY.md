# AU-AIA Mobile Core UI

The shared design language of AU-AIA mobile apps: the brand colors design defines, and the tokens apps use to color an interface.

## Language

### Palette

**Palette**:
The complete set of raw brand colors that design defines, organized into palette groups and color families.
_Avoid_: primitives, swatches, color scale

**Palette group**:
A named set of color families in the palette: Monotone, Primary, Secondary, Tertiary, Semantic or Alpha. The Semantic palette group holds colors for meaning, such as green and cerise; it is not a set of semantic tokens.
_Avoid_: category, tier

**Color family**:
One hue's ordered series of steps, such as Digital red.
_Avoid_: ramp, scale, shade set, palette (for a single hue)

**Step**:
One color in a color family, named by its number in the family, from 50 (lightest) to 900 (deepest).
_Avoid_: shade, tint, level, index

**Web-only step**:
A step that design marks as deeper than the brand color and meant for web use only.
_Avoid_: dark step, extended step

### Tokens

**Seed token**:
A single design decision that other tokens derive from, such as the primary brand color.
_Avoid_: base color, root token

**Map token**:
A token derived from seed tokens, with the name and meaning Ant Design gives it, such as the primary color while pressed. Ant Design's alias tokens, such as disabled text, belong to this layer.
_Avoid_: derived color

**Slot**:
One of the ten positions in Ant Design's color scale for a family, lightest first, with the seed color in the sixth; each map token takes its color from one slot. A slot is not a step: one step can fill two slots.
_Avoid_: index, level, palette index

**Semantic token**:
A token named for the AIA interface role it colors rather than for a color, such as the fill of an actionable element. It always points at another token or a step, never at a raw color.
_Avoid_: design token (too broad), component token

**Interactive role**:
One of the six purposes design gives an interactive color: Actionable, Highlighted, Informative, Success, Warning or Error. Highlighted is a role, not the selected state.
_Avoid_: intent, variant, status

**Interaction state**:
A condition of an interactive element that changes its color: default, pressed, focused, disabled or selected. Mobile has no hover state.
_Avoid_: mode, status, variant

### Theming

**Override**:
A value an app supplies in place of a token's default, for one scope: the whole app, a section of it, every instance of one component, or a single instance.
_Avoid_: customization, theme patch

**Algorithm**:
A rule that derives map tokens from seed tokens, such as building a whole color family from one overridden seed color.
_Avoid_: generator, theme mode
