export const SteamUserAuth = async (): Promise<void> => {
  const urlSearchParams = new URLSearchParams(window.location.href);
  const claimedId = urlSearchParams.get('openid.claimed_id');

  if (claimedId) {
    const steamIDMatch = claimedId.match(/\/(\d+)$/);

    if (steamIDMatch) {
      const steamID = steamIDMatch[1];
    } else {
      throw new Error('SteamID not found in claimedId: ' + claimedId);
    }
  } else {
    //throw new Error('claimedId is null.');
    console.log('claimedId is null.');
  }
};

export function sortByStatusAndGame(array: any) {
  array.sort(
    (a: { game: any; status: number }, b: { game: any; status: number }) => {
      if (a.game && !b.game) {
        return -1;
      }
      if (b.game && !a.game) {
        return 1;
      }
      if (a.status === b.status) {
        return 0;
      }
      if (a.status === 0) {
        return 1;
      }
      if (b.status === 0) {
        return -1;
      }
      return a.status - b.status;
    },
  );
  return array;
}
