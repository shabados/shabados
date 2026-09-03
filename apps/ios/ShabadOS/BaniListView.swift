import SwiftUI

struct BaniListView: View {
  var body: some View {
    List(Corpus.banis) { bani in
      NavigationLink(value: bani.id) {
        VStack(alignment: .leading, spacing: 4) {
          Text(bani.gurmukhi)
            .font(.custom(Fonts.gurmukhi, size: DesignTokens.defaultSize))
            .foregroundStyle(DesignTokens.foreground)
          Text(bani.latin)
            .font(.subheadline)
            .foregroundStyle(DesignTokens.foregroundMuted)
        }
        .padding(.vertical, 4)
      }
      // backgroundBase, not background: an inset-grouped List is two-tone — the
      // page sits on --bg and each row card on --bg-base. Painting both with --bg
      // is what made the list look flat.
      .listRowBackground(DesignTokens.backgroundBase)
    }
    .scrollContentBackground(.hidden)
    .background(DesignTokens.background)
    .navigationTitle("Nitnem")
    .navigationDestination(for: String.self) { id in
      if let bani = Corpus.banis.first(where: { $0.id == id }) {
        BaniReaderView(bani: bani)
      }
    }
  }
}
