import './Product.css';


const Modal = ({ handleClose, show, send }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName} id="add_Product" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ajouter un produit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="addProduct-id">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Nom</label>
                                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name's product"></input>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Description</label>
                                <input type="text" class="form-control" id="description" placeholder="Enter description"></input>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Marque</label>
                                <input type="text" class="form-control" id="brand" placeholder="Enter brand's product"></input>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Stock</label>
                                <input type="text" class="form-control" id="stock" placeholder="Enter stock"></input>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Prix</label>
                                <input type="text" name="price" class="form-control" id="price" placeholder="Enter price"></input>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Image url</label>
                                <input type="text" name="urlImage" class="form-control" id="urlImage" placeholder="Enter url image"></input>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <p id="warning"></p>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Fermer</button>
                        <button type="button" class="btn btn-primary" onClick={send}>Ajouter un produit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;