import {
  DemoNFT,
  Approval,
  ApprovalForAll,
  Transfer
} from "../generated/DemoNFT/DemoNFT"
import { Transfer as TransferSchema } from "../generated/schema"

export function handleApproval(event: Approval): void {
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

// For this tutorial, we will only read transfers
export function handleTransfer(event: Transfer): void {
  const id = event.params.tokenId.toHex();

  // instance we want to save 
  const transferToSave = new TransferSchema(id);

  // We get some data from the event
  transferToSave.from = event.params.from;
  transferToSave.to = event.params.to;
  transferToSave.tokenId = event.params.tokenId;

  let tokenContract = DemoNFT.bind(event.address);

  // We get some data from the view methods
  transferToSave.balanceOf = tokenContract.balanceOf(event.params.to)
  transferToSave.tokenURI = tokenContract.tokenURI(event.params.tokenId)

  // We save all of it, and this is what we will read on our frontend
  transferToSave.save();
}
