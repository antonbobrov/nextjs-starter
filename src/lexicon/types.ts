export interface ILexicon {
  siteName: string;
  copyright: string;

  navigation: {
    breadcrumbs: string;
  };

  menu: {
    label: string;
    open: string;
    close: string;
  };
}
