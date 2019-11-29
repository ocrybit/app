import { buttonRounded } from '../view/button-rounded'
import { html, TemplateResult } from 'lit-html'
import { subscribe } from 'ullr/directive'
import { hasEthereum } from '../../store/has-ethereum'
import { button } from '../pure/button'
import { connectToWallet } from '../reactive/connect-to-wallet'
import Web3 from 'web3'

interface Props {
	ethereum: Window['ethereum']
}

export const connectButton = ({ ethereum }: Props): TemplateResult =>
	buttonRounded(
		() => html`
			${subscribe(hasEthereum, x =>
				x
					? ethereum.isConnected()
						? button({
								content: 'connected',
								onClick: () => true
						  })
						: connectToWallet({ web3: Web3, ethereum })
					: button({
							content: 'not found',
							disabled: true,
							onClick: () => true
					  })
			)}
		`
	)
