"""Build Vixoria's concise one-page introduction for former colleagues."""

from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "deliverables" / "Vixoria_Developer_Capacity_One_Pager.pdf"
PREVIEW = ROOT / "deliverables" / "Vixoria_Developer_Capacity_One_Pager_preview.png"
LOGO = ROOT / "assets" / "vixoria-logo.svg"

REGULAR = r"C:\Windows\Fonts\segoeui.ttf"
BOLD = r"C:\Windows\Fonts\segoeuib.ttf"

NAVY = (13 / 255, 29 / 255, 63 / 255)
BLUE = (36 / 255, 87 / 255, 223 / 255)
INK = (16 / 255, 24 / 255, 40 / 255)
MUTED = (72 / 255, 84 / 255, 105 / 255)
LINE = (217 / 255, 225 / 255, 237 / 255)
PALE = (245 / 255, 248 / 255, 253 / 255)
WHITE = (1, 1, 1)


def write(page, x, y, value, *, size, font="regular", color=INK):
    page.insert_text((x, y), value, fontsize=size, fontname=font, color=color)


def paragraph(page, rect, value, *, size, line_height=1.4, color=MUTED, font="regular"):
    result = page.insert_textbox(
        fitz.Rect(*rect),
        value,
        fontsize=size,
        fontname=font,
        lineheight=line_height,
        color=color,
    )
    if result < 0:
        raise ValueError(f"Text does not fit: {value[:70]}")


def main():
    document = fitz.open()
    page = document.new_page(width=595, height=842)  # A4 portrait
    page.insert_font(fontname="regular", fontfile=REGULAR)
    page.insert_font(fontname="bold", fontfile=BOLD)

    logo_pdf = fitz.open(stream=fitz.open(LOGO).convert_to_pdf(), filetype="pdf")
    page.show_pdf_page(fitz.Rect(48, 39, 225, 85), logo_pdf, 0)
    write(page, 443, 67, "SOFTWARE + PEOPLE", size=8.1, font="bold", color=BLUE)
    page.draw_line((48, 107), (547, 107), color=LINE, width=1)

    write(page, 48, 139, "A quick note from Vijit", size=9.2, font="bold", color=BLUE)
    write(page, 48, 190, "Need one more developer", size=29.5, font="bold", color=NAVY)
    write(page, 48, 229, "for a live project?", size=29.5, font="bold", color=NAVY)
    paragraph(
        page,
        (49, 256, 541, 315),
        "Hi, I'm Vijit. Alongside building software at Vixoria Technologies, "
        "I help teams add .NET or React development capacity when a project needs an extra pair of hands.",
        size=12.3,
        line_height=1.38,
    )

    page.draw_rect(fitz.Rect(48, 331, 547, 553), color=None, fill=PALE)
    page.draw_rect(fitz.Rect(48, 331, 53, 553), color=None, fill=BLUE)
    write(page, 73, 364, "HOW IT WORKS", size=9.2, font="bold", color=BLUE)
    steps = [
        ("01", "Tell me the role and when you need help."),
        ("02", "I review technical fit and arrange an interview."),
        ("03", "The developer works in your team's tools and process."),
    ]
    for index, (number, description) in enumerate(steps):
        baseline = 410 + index * 55
        write(page, 73, baseline, number, size=10, font="bold", color=BLUE)
        write(page, 111, baseline, description, size=11.2, color=INK)
        if index < 2:
            page.draw_line((73, baseline + 15), (520, baseline + 15), color=LINE, width=0.8)

    write(page, 48, 604, "An introduction would mean a lot.", size=17.3, font="bold", color=NAVY)
    paragraph(
        page,
        (49, 620, 541, 677),
        "If you know a founder, CTO or delivery manager who needs an extra developer, "
        "please connect us. I'll take it from there.",
        size=11.1,
        line_height=1.39,
    )

    page.draw_rect(fitz.Rect(48, 695, 547, 794), color=None, fill=NAVY)
    write(page, 72, 728, "Let's talk about the role and timing.", size=14.3, font="bold", color=WHITE)
    write(page, 72, 752, "vijit@vixoriatechnologies.com", size=11.2, font="bold", color=WHITE)
    write(page, 72, 773, "+91 70221 46813   |   vixoriatechnologies.com", size=9.7, color=(0.79, 0.85, 0.96))
    page.insert_link(
        {"kind": fitz.LINK_URI, "from": fitz.Rect(70, 738, 330, 759), "uri": "mailto:vijit@vixoriatechnologies.com"}
    )
    page.insert_link(
        {"kind": fitz.LINK_URI, "from": fitz.Rect(221, 758, 400, 780), "uri": "https://vixoriatechnologies.com"}
    )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    document.set_metadata(
        {
            "title": "Vixoria Technologies | Developer Capacity",
            "author": "Vixoria Technologies",
            "subject": "A one-page introduction to Vixoria's developer capacity offer",
        }
    )
    document.save(OUTPUT, garbage=4, deflate=True)
    page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False).save(PREVIEW)
    print(OUTPUT)
    print(PREVIEW)


if __name__ == "__main__":
    main()
