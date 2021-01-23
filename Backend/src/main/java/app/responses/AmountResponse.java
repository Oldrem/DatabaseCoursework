package app.responses;

public class AmountResponse {
    private Integer amount;

    private AmountResponse() {}

    public AmountResponse(Integer amount) {
        this.amount = amount;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
