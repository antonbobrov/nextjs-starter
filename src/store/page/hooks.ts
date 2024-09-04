import { useContext } from 'react';
import { PageContext } from './context';

export function usePage() {
  return useContext(PageContext);
}

export function usePageGlobal() {
  const { global } = usePage();

  return global;
}

export function usePageLexicon() {
  const { lexicon } = usePage();

  return lexicon;
}

export function usePageTemplate() {
  const { template } = usePage();

  return template;
}

export function usePageUrl() {
  const { url } = usePage();

  return url;
}
