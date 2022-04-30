import React from 'react';
import constate from 'constate';
import { TempleWallet } from '@temple-wallet/dapp';
import { NETWORK } from './defaults';


export const [
  DAppProvider,
  useWallet,
  useTezos,
  useAccountPkh,
  useReady,
  useConnect,
] = constate(
  useDApp,
  (v) => v.wallet,
  (v) => v.tezos,
  (v) => v.accountPkh,
  (v) => v.ready,
  (v) => v.connect
);

function useDApp({ appName }) {
  const [{ wallet, tezos, accountPkh }, setState] = React.useState(() => ({
    wallet: null,
    tezos: null,
    accountPkh: null,
  }));

  const ready = Boolean(tezos);

  React.useEffect(() => {
    return TempleWallet.onAvailabilityChange(async (available) => {
      if (available) {
        let perm;
        try {
          perm = await TempleWallet.getCurrentPermission();
        } catch {}

        const wlt = new TempleWallet(appName, perm);
        setState({
          wallet: wlt,
          tezos: wlt.connected ? wlt.toTezos() : null,
          accountPkh: wlt.connected ? await wlt.getPKH() : null,
        });
      } else {
        setState({
          wallet: null,
          tezos: null,
          accountPkh: null,
        });
      }
    });
  }, [appName, setState]);

React.useEffect(() => {
    return TempleWallet.onAvailabilityChange((available) => {
      setState({
        wallet: available ? new TempleWallet(appName) : undefined,
        tezos: undefined,
        accountPkh: undefined,
      })
    })
  }, [setState, appName])

  React.useEffect(() => {
    if (wallet && wallet.connected) {
      return TempleWallet.onPermissionChange((perm) => {
        if (!perm) {
          setState({
            wallet: new TempleWallet(appName),
            tezos: null,
            accountPkh: null,
          });
        }
      });
    }
  }, [wallet, appName, setState]);

  const connect = React.useCallback(
    async (network, opts) => {
      try {
        if (!wallet) {
          throw new Error('Temple Wallet not available');
        }
        await wallet.connect(network, opts);
        const tzs = wallet.toTezos();
        const pkh = await tzs.wallet.pkh();
        setState({
          wallet,
          tezos: tzs,
          accountPkh: pkh,
        });
      } catch (err) {
        alert(`Failed to connect TempleWallet: ${err.message}`);
      }
    },
    [setState, wallet]
  );

  return {
    wallet,
    tezos,
    accountPkh,
    ready,
    connect,
  };
}












// stuck here


// function ConnectionSection() {
//     const connect = useConnect()
//     const accountPkh = useAccountPkh()
//     const tezos = useTezos()
//     const [balance, setBalance] = React.useState(null)
//     const handleConnect = React.useCallback(async () => {
//       try {
//         await connect(NETWORK, { forcePermission: true })
//       } catch (err) {
//         console.error(err.message)
//       }
//     }, [connect])
  
  
//     const accountPkhPreview = React.useMemo(() => {
//       if (!accountPkh) return undefined
//       else {
//         const accPkh = (accountPkh) 
//         const ln = accPkh.length
//         return `${accPkh.slice(0, 7)}...${accPkh.slice(ln - 4, ln)}`
//       }
//     }, [accountPkh])
  
//     const loadBalance = React.useCallback(async () => {
//       if (tezos) {
//         const tezosOk = tezos 
//         const bal = await tezosOk.tz.getBalance(accountPkh)
//         setBalance(tezosOk.format('mutez', 'tz', bal).toString())
//       }
//     }, [tezos, accountPkh, setBalance])
  
//     React.useEffect(() => {
//       loadBalance()
//     }, [loadBalance])
  
//     useOnBlock(tezos, loadBalance)
  
//     return <div style={{ display: "grid", gridTemplateColumns: '1fr 1fr 1fr', margin: '0 auto', width: "500px" }}>
//         <div>{balance}</div>
//         <div>{accountPkhPreview}</div>
//         <button onClick={handleConnect}>Connect account</button>
//       </div>
//   }



// export function useOnBlock(tezos, callback) {
//   const blockHashRef = React.useRef();

//   React.useEffect(() => {
//     let sub;
//     spawnSub();
//     return () => sub.close();

//     function spawnSub() {
//       sub = tezos.stream.subscribe('head');

//       sub.on('data', (hash) => {
//         if (blockHashRef.current && blockHashRef.current !== hash) {
//           callback(hash);
//         }
//         blockHashRef.current = hash;
//       });
//       sub.on('error', (err) => {
//         if (process.env.NODE_ENV === 'development') {
//           console.error(err);
//         }
//         sub.close();
//         spawnSub();
//       });
//     }
//   }, [tezos, callback]);
// }

